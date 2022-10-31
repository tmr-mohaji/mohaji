import React, { useEffect, useState, useRef, createRef } from "react";
import axios from 'axios';
import './Map.scss';

const { naver } = window;
const EVENT_PAGE = "http://localhost:8000/event";

function MapComponent(props) {

    const [myLocation, setMyLocation] = useState({latitude: 37.3724620, longitude: 127.1051714});
    const [zoom, setZoom] = useState(12);
    const container = useRef();
    const addressInput = createRef();
    const {city, type, date} = props.filter;
    // const location = useLocation();

    // 🤔 Event.js에서 button 누르면 누른 데이터 address 가져오게 함. 
    const [ event , setEvent ] = useState('');
    // const [animation, setAnimation ] = useState(null);

    const initMap = async () => {

        const mapOption = {
            center: myLocation,
            zoom: zoom,
            minZoom: 1,
            disableKineticPan: false,
            mapTypeControl : true,
            zoomControl: true,
            scrollWheel: true
        };

//------------------------------ 현재 위치 가져오기----------------------------------//
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setMyLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                })
        } else {
            alert("현재 위치 찾을 수 없음");
        }

        if (typeof myLocation.latitude == "number") {
            // console.log("위치", myLocation);
            // LatLng : 위/경도 좌표를 정의함.
            mapOption.center = new naver.maps.LatLng(myLocation.latitude, myLocation.longitude); // 지도 시작 지점
        } else {
            alert("현재 위치 오류");
            mapOption.center = new naver.maps.LatLng(37.3724620, 127.1051714);
        }

        const map = new naver.maps.Map(container.current, mapOption);

        // 마커 애니메이션
        // map.fitBounds(naver.maps.LatLngBounds.bounds(new naver.maps.LatLng(37.3724620, 127.1051714), new naver.maps.LatLng(37.3542795, 127.1174332)));

        //마커 속성
        const markerOptions = {
            position: mapOption.center,
            map,
            icon: {
                content: `<img src=${require('./img/nowlocation.png')} width='30px' height='30px'/>`,
                size: new naver.maps.Size(50, 52),
                origin: new naver.maps.Point(0,0),
                anchor: new naver.maps.Point(25, 26),
            }
            // animation: naver.maps.Animation.DROP
        }

        const marker = new naver.maps.Marker(markerOptions);

        naver.maps.Event.addListener(map, 'click', function() {
            setEvent('');
            window.location.replace('/event?city=전체');
        });



//-------------------------- DB event 주소 -> 좌표 전환 및 마커표시------------------------------------//

        axios.get(EVENT_PAGE, {
            params: {city: city, type: type, date: date}
        })
        .then((req) => {

            let ls = [];
            for(let i=0; i<req.data.length; i++) {

                axios.post(process.env.REACT_APP_EVENT_URL + "/likeInfo", {user_id: props.id, event_id: req.data[i].id})
                .then((result) => {
                    console.log("data", result.data);
                    if (result.data != "") {
                        console.log("true");
                        ls.push(true);
                    } else {
                        console.log("false");
                        ls.push(false);
                    }
                })
            }

            console.log("ls", ls);
            
            let event = {};
            for (let i=0; i<req.data.length; i++) {
                req.data[i]['like'] = ls[i];
                event[`id_${req.data[i].id}`] = req.data[i];
            }
            return req.data;

        }).then((addressData) => {
                if (props.clickData != "") {
                    const result = addressData.filter((data) => { return data.address === props.address });
                    setEvent(props.address);
                    return result;
                } else {
                    return addressData;
                }
        })
        .then((data) => {

                    data.map(function(aData) {                   
                        // console.log('adata:',aData.like);
                        
                    naver.maps.Service.geocode({
                        query: aData.address
                    }, function(status,response) {
                        if (status === naver.maps.Service.Status.ERROR) {
                            return alert('error!');
                        }
                        
                        var result = response.v2;
                        var item = result.addresses;

                        var data_lat = item[0].y;
                        var data_lng = item[0].x;
                    
                    // // 2. 각 이벤트별 마커 표시

                    if ( aData.like == 'undefined' ) {
                        var event_marker = new naver.maps.Marker({
                            map: map,
                            position: new naver.maps.LatLng(data_lat,data_lng),
                            icon : {
                            content: `<img src=${require('./img/marker.png')} width='30px' height='30px'/>`,
                                },
                            });
                        } else {
                            //2-2. 좋아요한 이벤트 마커 표시
                        var event_marker = new naver.maps.Marker({
                            map: map,
                            position: new naver.maps.LatLng(data_lat,data_lng),
                            icon : {
                                content: `<img src=${require('./img/heart.png')} width='30px' height='30px'/>`,
                                }
                            });
                        }
                

                    // 3. 각 마커별 정보창 표시


                        const infoText = 
                            `<div className='infoText' style='padding:20px; background-color:white; color:black; border-radius:20px; opcity:75%; display:flex; align-items:center;'>
                            <div style='margin-right:30px;'>
                                <div style='font-weight:normal; text-align:center; font-size:11px; margin-top:3px; width:50px; background-color:#FFE6E6; border-radius:4px;'>${aData.type}</div>    
                                <div style='font-weight:bold; font-size:15px; cursor:pointer;'>${aData.title}<a href='/event/${aData.id}'><img src=${require('./img/arrow.png')} style='width:12px; height:12px; margin-left:5px; margin-bottom:4px;' alt='상세보기'></a></div>
                                <div>
                                    <span style='font-size:10px; color:lightgrey;'>평점 : ${Math.ceil(aData.avg)}</span>
                                </div>
                                <div style='margin-top:10px;'>
                                <span style='font-size:12px; font-weight:bold;padding:5px; border-radius:3px;background-color:#5AD2FF; color:white;'><img src=${require('./img/detour.png')} style='width:15px; height:15px;'/>길찾기</span>
                                </div>
                            </div>
                            <div>
                                <img src='./img/${aData.filename}' style='width:70px; height:100px;' />
                            </div>
                            </div>`;

                        const infoText2 = 
                            `<div className='infoText' style='padding:20px; background-color:white; color:black; border-radius:20px; opcity:75%; display:flex; align-items:center;'>
                            <div style='margin-right:30px;'>
                                <div style='font-weight:normal; text-align:center; font-size:11px; margin-top:3px; width:50px; background-color:#FFE6E6; border-radius:4px;'>${props.clickData.type}</div>    
                                <div style='font-weight:bold; font-size:15px; cursor:pointer;'>${props.clickData.title}<a href='/event/${props.clickData.id}'><img src=${require('./img/arrow.png')} style='width:12px; height:12px; margin-left:5px; margin-bottom:4px;' alt='상세보기'></a></div>
                                <div>
                                    <span style='font-size:10px; color:lightgrey;'>평점 : ${Math.ceil(aData.avg)}</span>
                                </div>
                                <div style='margin-top:10px;'>
                                <span style='font-size:12px; font-weight:bold;padding:5px; border-radius:3px;background-color:#5AD2FF; color:white;'><img src=${require('./img/detour.png')} style='width:15px; height:15px;' />길찾기</span>
                                </div>
                            </div>
                            <div>
                                <img src='./img/${props.clickData.filename}' style='width:70px; height:100px;' />
                            </div>
                            </div>`;
                        
                        const infowindow = new naver.maps.InfoWindow({
                            content: infoText,
                            borderWidth:0,
                            maxWidth:500,
                            backgroundColor:'transparent',
                            anchorColor: '#fff',
                            anchorSize: {
                                width: 15,
                                height: 15
                            },                       
                        });

                        const infowindow2 = new naver.maps.InfoWindow({
                            content: infoText2,
                            borderWidth:0,
                            maxWidth:500,
                            backgroundColor:'transparent',
                            anchorColor: '#fff',
                            anchorSize: {
                                width: 15,
                                height: 15
                            },                            
                        });

                        const infoText3 = 
                            `<div className='infoText' style='padding:20px; background-color:white; color:black; border-radius:20px; opcity:75%; display:flex; align-items:center;'>
                            <div style='margin-right:30px;'>   
                                <div style='font-weight:bold; font-size:15px;'>현재위치입니다.</div>
                            </div>`;
                        
                        const infowindow3 = new naver.maps.InfoWindow({
                            content: infoText3,
                            borderWidth:0,
                            maxWidth:500,
                            backgroundColor:'transparent',
                            anchorColor: '#fff',
                            anchorSize: {
                                width: 15,
                                height: 15
                            },                       
                        });

                            naver.maps.Event.addListener(event_marker, 'click', function(e) {
                                map.panTo(e.coord);
                                map.setZoom(14);

                                if (infowindow.getMap()) {
                                    console.log('열려있음.')
                                    infowindow.close();
                                } else {
                                    infowindow.open(map, event_marker);
                                    if (event_marker.getAnimation() != null) {
                                        event_marker.setAnimation(null);
                                    } else {
                                        event_marker.setAnimation(naver.maps.Animation.BOUNCE)
                                    }
                                }

                                if(props.clickData != "") {
                                    if (infowindow2.getMap()) {
                                        infowindow2.close();
                                    } else {
                                        infowindow2.open(map, event_marker);
                                        if (event_marker.getAnimation() != null) {
                                            event_marker.setAnimation(null);
                                        } else {
                                            event_marker.setAnimation(naver.maps.Animation.BOUNCE)
                                        }
                                    }
                                }
                            });
                            // infowindow3.open(map, marker);           ///////////// 에러.. 이렇게 할경우 현재위치, 지도상 마커 클릭시 정보창이 나타남. but , 이벤트에서 지도버튼 누르면 안나옴.
                            infowindow.open(map,event_marker);          //////////// 에러.. 겹치는 장소의 한가지만 나옴.
                            // infowindow2.open(map,event_marker);      //////////// 에러 .. 활성화하면 처음 로딩될때 undefined가 뜸
                            }
                    )
                })
            
            })  
    }

    useEffect(() => {
        initMap();
    }, [props.city, props.address, props.clickData]); 

    return (
    <div className="mapPart">
        <div ref={container} style={{width: '100%', height: '90vh'}}></div><br />
    </div>);
}

export default MapComponent;