import data from '../db/test.json';
import React, { useEffect, useState, useRef, createRef } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Map.scss';

const { naver } = window;
const EVENT_PAGE = "http://localhost:8000/event";

function MapComponent(props) {

    const [myLocation, setMyLocation] = useState({latitude: 37.3724620, longitude: 127.1051714});
    const [zoom, setZoom] = useState(11);
    const container = useRef();
    const addressInput = createRef();
    const location = useLocation();



    // 🤔 Event.js에서 button 누르면 누른 데이터 address 가져오게 함. 
    const [ event , setEvent ] = useState('');
    console.log(event);
    const EventAddress = location.state.address;
    // console.log(EventAddress); //이벤트 목록에서 주소가 들어옴. 
    // 참고로 이 데이터는 inptu창에서 readonly하도록 보내줌!
    // 들어온 주소를 setEvent에 담아줌... 요 아래 부분이 맞는지 일단 의문.
    useEffect(() => {
        setEvent(EventAddress);
    },[EventAddress]);



    const initMap = () => {

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
            //LatLng : 위/경도 좌표를 정의함.
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
                content: `<img src=${require('./1.png')} width='30px' height='30px'/>`,
                size: new naver.maps.Size(50, 52),
                origin: new naver.maps.Point(0,0),
                anchor: new naver.maps.Point(25, 26),
            }
            // animation: naver.maps.Animation.DROP
        }

        const marker = new naver.maps.Marker(markerOptions);

        naver.maps.Event.addListener(map, 'click', function(e) {
            console.log(e.coord);
            marker.setPosition(e.coord);
        });

//-------------------------- DB event 주소 -> 좌표 전환 및 마커표시------------------------------------//

        axios.get(EVENT_PAGE, {
            params: {city: props.city}
        })
        .then((req) => { return req.data;})
        .then((addressData) => {

            // 1. 주소 >> 좌표 전환

            // 🤔 
            //1)여기 전체 데이터에서 Event.js에서 버튼 클릭해서 받은 주소와 비교 해서 데이터가 일치할 경우 그 데이터만 담아서 .then에 보내줌. 

            //2) 1)이 아닐경우 전체 데이터를 .then에 보내줌.
            if (addressInput.current.value != '') {
                const result = addressData.filter (data => { return data.address === event });
                return result;
            } else {
                return addressData;
            }
        })
        .then((data) => {

            // addressData.map(function(aData) {                                       
                    data.map(function(aData) {                   

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
                    
                    // 2. 각 이벤트별 마커 표시
                        const event_marker = new naver.maps.Marker({
                            map: map,
                            position: new naver.maps.LatLng(data_lat,data_lng),
                            icon : {
                                content: `<img src=${require('./marker.png')} width='30px' height='30px'/>`,
                                size: new naver.maps.Size(50, 52),
                                origin: new naver.maps.Point(0,0),
                                anchor: new naver.maps.Point(25, 26),
                            }
                        });

                    // 3. 각 마커별 정보창 표시

                        const infoText = [ `<div class='iw_inner_container' style="padding:20px;"><div style='font-weight:bold;'>${aData.title}</div><div>${aData.type}</div></div>`].join('');

                        const infowindow = new naver.maps.InfoWindow({
                            content: infoText,
                            borderWidth:0,
                            maxWidth:140,
                            
                        });
                        
                        naver.maps.Event.addListener(event_marker, 'click', function(e) {
                            map.panTo(e.coord);
                            map.setZoom(13);
                            if (infowindow.getMap()) {
                                infowindow.close();
                            } else {
                                infowindow.open(map, event_marker);
                            }
                        });
                        infowindow.open(map,event_marker);
                        })

                })
            
            })

    }

    useEffect(() => {
        initMap();
    }, [props.city],[EventAddress]); 
    


    return (<>
        <div ref={container} style={{width: '500px', height: '500px'}}></div>
        <input ref={addressInput} value={EventAddress || ''} readOnly />
        <button type='button' onClick={() => { setEvent(''); addressInput.current.value = "";}}>전체</button>
        <br />
        <button>지도 이동하기</button>
    </>);
}

export default MapComponent;