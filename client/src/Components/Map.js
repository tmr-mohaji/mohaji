import data from '../db/test.json';
import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';

const { naver } = window;
const SEARCH_PAGE = "http://localhost:8000/search";

function MapComponent() {

    const [myLocation, setMyLocation] = useState({latitude: 37.3724620, longitude: 127.1051714});
    const container = useRef();

    const initMap = () => {

        const mapOption = {
            zoom: 10,
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

        axios.get(SEARCH_PAGE)
        .then((req) => { return req.data;})
        .then((addressData) => {
            // console.log(addressData); // 1. db이벤트 데이터 배열로 가져옴.

            // 1. 주소 >> 좌표 전환
            addressData.map(function(aData) {
                    naver.maps.Service.geocode({
                        query: aData.address
                    }, function(status,response) {
                        if (status === naver.maps.Service.Status.ERROR) {
                            return alert('error!');
                        }
                        
                        var result = response.v2;
                        var item = result.addresses;
                        // console.log('result: ', result);
                        // console.log('item: ', item);
                        var data_lat = item[0].y;
                        var data_lng = item[0].x;
                        // console.log(data_lat);
                        // console.log(data_lng);
                    
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
                        const infoText = [ `<div class='iw_inner'><div style='font-weight:bold;'>${aData.title}</div></div>`].join('');
                        // // console.log(infoText);
                        const infowindow = new naver.maps.InfoWindow({
                            content: infoText
                        });
                        naver.maps.Event.addListener(event_marker, 'click', function(e) {
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

    //// 오류 발생 /////
    // 1. [] 빈배열로 설정할 경우 현재위치가 오락가락함. (나타나기도 하고, 정상적으로 표시되기도 하고, 아예 다른 위치를 나타내기도 함.)
    // 2. [myLocation, container] 로 설정할 경우 1) 현재 위치는 나타나지만 이벤트 주소 마커가 불안정함. 2)지도 줌인 줌아웃 안됨. 3) TypeError : Cannot read properties of undefined (reading 'length') 라는 오류가 무한반복됨. 
    useEffect(() => {
        initMap();
    }, []); // [myLocation, container] 를 해줄경우 지도 줌인 줌아웃이 전혀 안됨.




    return (<>
        <div ref={container} style={{width: '500px', height: '500px'}}></div>
        <div className='search'>
            <input type='text' placeholder='주소입력창'></input>
            <input type='button' value='주소검색' />
        </div>
        <button>지도 이동하기</button>
    </>);
}

export default MapComponent;