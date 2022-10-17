CREATE DATABASE mohaji;
use mohaji;

drop table event;

CREATE TABLE event (
	id int not null primary key auto_increment,
    title varchar(255) not null,
    url varchar(255) not null default "없음",
    detail mediumtext,
    type varchar(255) not null,
    place varchar(255) not null,
    address mediumtext not null,
    start_date date not null,
    end_date date not null,
    time varchar(255) not null default "홈페이지 참고",
    people varchar(255) not null default "누구나",
    filename varchar(255) not null,
    price varchar(255) not null default "무료"
);

delete from event where id < 7;
ALTER TABLE event AUTO_INCREMENT = 1;

INSERT INTO event (title, url, detail, type, place, address, start_date, end_date, time, people, filename, price) VALUES 
("잔나비 전국투어 <판타스틱 올드 패션드 송년회> - 서울", "https://www.instagram.com/p/CjCd8RCPVc4/", "잔나비와 함께 하는 판타스틱 올드패션드 송년파티! 이번엔 전국을 순회합니다! 어느 해 보다 뜨거웠던 2022년! 그 마지막 에너지를 불 사지르며 장렬히 빛을 낼 우리의! ‘잔나비와 구닥다리영웅들!’ 폭죽처럼 튀어 오르는 그들의 스파크를 두 눈으로 목격하세요! ‘번쩍, 내 최후의 발악이야. 불꽃놀이 그 마지막 순간이야. 남김없이 불태워야 해.’ 잔나비 - 전설 中 우리는 늘 남다른 공연을 만듭니다. -잔나비 최정훈", "공연", "올림픽공원 올림픽홀", "서울 송파구 방이동 88-2", "2022-11-26", "2022-11-27", "토, 일 17:00", "누구나", "img1.jpeg", "VIP석(현장수령/Will Call) 159,000원\nVIP석 159,000원\nR석 139,000원\nS석 124,000원");
INSERT INTO event (title, url, detail, type, place, address, start_date, end_date, time, people, filename, price) VALUES 
("서울디자인 2022", "http://seouldesign2022.or.kr/", "다시 찾은 아름다운 우리의 일상에 대한 격려이며, 미래를 위한 문제해결의 방법을 디자인의 역할과 가치에 담아 소통하고자 하는 희망을 담았습니다. 디자인을 통해 소통하는 시민축제 '서울디자인위크'국내외 대표 디자인 비즈니스 런칭쇼인 'DDP디자인페어'를 통해 글로벌 디자인 트랜드를 선도하는 아시아 대표 디자인 종합 MICE 역할로 서울의 위상을 높이고 디자인 부가가치를 창출하고자 합니다.", "박람회", "동대문디자인플라자", "서울 중구 을지로 281", "2022-10-19", "2022-11-02", "10:00 - 20:00", "누구나", "img2.jpeg", "미취학 아동, 초등생: 보호자 동반 시 무료\n펫데이: 10월 21일(금)-22일(토) 반려동물 동반 시 무료\n학생주간: 10월 24일(월)-28일(금) 중, 고등 학생은 학생증을 지참 시 무료");
INSERT INTO event (title, url, detail, type, place, address, start_date, end_date, time, people, filename, price) VALUES 
("한강달빛야시장", "http://www.bamdokkaebi.org/", "한강 위, 달빛이 떠오르면 맛있는 먹거리는 물론 다양한 이벤트와 아티스트가 참여하는 프리마켓, 오래도록 간직하고 싶은 핸드메이드 상품까지 낭만적인 야경을 배경으로 모두 한자리에 모입니다. 한강 달빛 야시장은 달빛 아래 예술과 낭만이 있는 서울형 야시장입니다.", "축제", "반포한강공원 달빛광장 일대, 여의도한강공원 일", "서울 서초구 반포동 115-5", "2022-10-22", "2022-10-23", "밤", "누구나", "img3.jpeg", "무료");

select * from event;