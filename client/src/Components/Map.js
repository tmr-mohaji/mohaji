import data from '../db/test.json';
import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';

const { naver } = window;


function MapComponent() {

    // const AxiosData = () => {
    //     axios.get('https://localhost:8000/')
    //     .then((data) => {
    //         console.log(data);
    //     })
    // }

    // // 위나 아래나~
    // // const AxiosData = async() => {
    // //     const data = await axios.get('https://localhost:8000/');
    // //     console.log(data);
    // // }

    // useEffect(() => {
    //     AxiosData();
    // },[]);
    

  const testData = data.location; //[{},{}]
    
    const [address, setAddress] = useState();
    const [myLocation, setMyLocation] = useState({latitude: 37.3724620, longitude: 127.1051714});
    const container = useRef();

    const initMap = () => {

        // 현재 위치 가져오기

        // 현재 발생되고 있는 오류
        // 1. 콘솔이 두번씩 찍히는 현상
        // 2. 처음에 아래 "현재 위치 오류" alert가 나옴 -> 위치를 가져오는데 시간이 걸리는 거 같음
        // 3. 특정한 다른 위치가 꾸준히 나옴 (나는 신길동..) -> 뒤늦게 정확한 현재 위치가 찍힘

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

        const mapOption = {
            zoom: 14,
            zoomControl: true,
            scrollWheel: true
        };

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
                // content: `<img src=${require('./public/maker.png')} />`,
                content: `<img src=${require('./marker.png')} width='30px' height='30px'/>`,
                size: new naver.maps.Size(50, 52),
                origin: new naver.maps.Point(0,0),
                anchor: new naver.maps.Point(25, 26),
            }
            // animation: naver.maps.Animation.DROP
        }

        const marker = new naver.maps.Marker(markerOptions);


        // 임시 db파일에서 받아온 위도/경도를 이용해 마커 생성.
        testData.map(function(tData,i) {
            new naver.maps.Marker({
              map: map,
              position: new naver.maps.LatLng(tData.latitude, tData.longitude),
              icon : {
                  content: `<img src=${require('./marker.png')} width='30px' height='30px'/>`,
                  size: new naver.maps.Size(50, 52),
                  origin: new naver.maps.Point(0,0),
                  anchor: new naver.maps.Point(25, 26),
              }
            });
        })

        naver.maps.Event.addListener(map, 'click', function(e) {
            console.log(e.coord);
            marker.setPosition(e.coord);
        });
    }

    useEffect(() => {
        initMap();
    }, [myLocation, container]);

    return (<>
        <div ref={container} style={{width: '500px', height: '500px'}}></div>
        <button>지도 이동하기</button>
    </>);
}

export default MapComponent;