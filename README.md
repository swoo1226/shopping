# 목차

# 안녕하세요!

클래스101의 프론트엔드 직군(React, React Native)에 지원해주셔서 감사합니다. 클래스101에서는 직무 면접에서 지원자와 보다 심도있는 이야기를 나누기 위해 과제 단계를 진행하고 있습니다.

과제에서 구현해야 하는 것은 **클래스101의 클래스를 구매하는 장바구니 시스템**입니다. 아래 정의된 요구사항에 맞춰 구현하시되, 요구사항에서 정의되지 않은 부분은 일반적인 커머스 쇼핑몰의 상품 목록 페이지와 장바구니 기능을 구현한다고 생각하시고 작업해주시면 됩니다.

## 과제 진행 방법

---

- **메일을 받으신 날로부터 1주일** 동안 과제를 구현합니다
**(예: 이번 주 목요일에 메일을 받는다면 다음 주 목요일 23:59까지 제출합니다)**
- Git 을 이용해 코드 버전 관리를 합니다
- 과제 구현이 완료되면 프로젝트를 .zip으로 압축하여 메일([r](mailto:recruit@class101.net)ecruit@101.inc)로 제출 해주세요
    - **Git 히스토리를 볼 수 있도록 .git 디렉토리를 꼭 포함해주세요!**
- 작업 중 과제와 관련해서 모호한 부분이 있다면 메일로 알려주세요. 하루 이내에 답변을 드립니다.

# 과제 세부사항

## 조건

---

- ~~**React 혹은 React Native로 개발합니다**~~
    - 그 외 다른 라이브러리는 자유롭게 사용 가능합니다
- ~~Git을 이용해 코드 버전 관리를 합니다~~
- ~~로컬 환경에서 프로젝트를 실행할 수 있어야 합니다~~
(예: npm run start 커맨드를 입력하여 [`localhost:3001`](http://localhost:3001) 에서 실행)
- 장바구니를 구현하는 선에서 요구사항은 자유롭게 변경 가능합니다
    - 생각하시기에 더 나은 기획이 있다면 그에 따라 구현하시고 이유를 `README.md`에 작성 해주세요

## 요구사항

---

- **상품 목록 페이지** (route: `/products`, RN의 경우 `ProductListScene`)를 구현합니다
    - 각 상품은 가격과 사진, 상품 제목을 표시합니다
    - 상품의 score를 기준으로 내림차순으로 정렬하여 5개씩 보여주는 페이지네이션을 구현합니다
        - ReactNative의 경우 `FlatList`를 이용하고, 리스트 최하단에 `더 불러오기` 버튼을 만들어 페이지네이션을 구현합니다.
    - 각 상품에는 장바구니 버튼이 있습니다
        - 상품이 장바구니에 담겨 있지 않은 경우 - `담기` 버튼을 구현합니다
        - 상품이 장바구니에 담겨 있는 경우 - `빼기` 버튼을 구현합니다
- **장바구니 페이지** (route: `/cart`, RN의 경우 `CartScene`)
    - 장바구니에는 최대 3개의 상품이 담길 수 있습니다
    - 장바구니의 상품 중 결제에 포함할 상품을 체크박스 등의 UI로 선택할 수 있습니다
    - 장바구니에 담긴 각 상품의 수량을 선택할 수 있습니다
        - 단, 최소 1개의 수량이 지정되어야 합니다
    - 장바구니에 담긴 전체 상품의 최종 결제 금액에 대하여 쿠폰을 적용할 수 있습니다
        - 쿠폰(coupon)은 두 가지 type을 가지고 있습니다
            1. 정액 할인(amount) - `{discountAmount}원` 만큼 할인합니다
            2. 비율 할인(rate) - `{discountRate}%` 만큼 할인합니다
        - 상품 중에는 쿠폰 사용이 불가능한 상품(`availableCoupon == false`)이 존재합니다
            - 이 상품들은 쿠폰 할인 계산에서 제외합니다
        - 예1: 장바구니에서 상품A(50,000원)와 상품B(70,000)원을 모두 체크하고 5,000원 할인 쿠폰을 적용할 경우
        ⇒ `(50000 + 70000) - 5000 = 115,000원` 이 최종 결제 금액이 됩니다
        - 예2: 장바구니에서 상품A(50,000원)와 상품B(70,000)원와 상품C(쿠폰 사용 불가, 100,000원) 중 상품 A와 상품 C만 체크하고 10% 할인 쿠폰을 적용할 경우
        ⇒ 상품 A에만 할인이 적용되어 `(50000 * 0.9) + 100,000 = 145,000원` 이 최종 결제 금액이 됩니다
    - 최종 결제 금액을 장바구니 페이지 하단에 보여주세요
        - 소수점 가격이 생긴다면 버림 처리 합니다
- 상품과 쿠폰 데이터는 하단에 주어진 데이터를 사용해주세요
    - 상품과 쿠폰 데이터가 서버에서 주어진다고 생각하고 구현 해주세요
    - 서버에서 주어진다고 가정하기 때문에, **해당 데이터의 raw 값을 직접 변경하는 것은 허용하지 않습니다**

## Data

---

```tsx
// productItems.js
const productItems = [
  {
    id: 'B9vUv0E0ibc0X55kVVLr',
    title: '포근한 니트로 만드는 나만의 글씨, 봉봉메이드 니트레터링 클래스',
    coverImage: 'https://cdn.class101.net/images/3a25ecd9-d1ab-4d21-8cc1-522ea711e729',
    price: 560000,
    score: 200,
  },
  {
    id: '81x83ysiEHsHCBoeVh2O',
    title: '글씨가 주는 소소한 행복, Lettering Together!',
    coverImage: 'https://cdn.class101.net/images/ec0f0c15-aeec-43a3-a0c9-b649b0999f0a',
    price: 320000,
    score: 300,

  },
  {
    id: 'ZXV8mCcvbpXKm5J5snUq',
    title: '붓펜으로 그려낸 보통날, 보통의 글씨',
    coverImage: 'https://cdn.class101.net/images/a363a069-5aaf-40cb-822e-a2cab585c37e',
    price: 240000,
    score: 350,

  },
  {
    "id": "tpP45lSwqf1X1yEEFqL4",
    "title": "수놓는 발바닥과 함께 하는 꽁냥꽁냥 고양이 자수",
    "coverImage": "https://cdn.class101.net/images/e6b7bde6-b23d-447f-9cdf-3879caf7eb13",
    price: 90000,
    score: 120,
    availableCoupon: false,
  },
  {
    "id": "nc9XiAWAN4uhNr6pDqlG",
    "title": "소복소복 바늘 끝에서 피어오르는 자수",
    "coverImage": "https://cdn.class101.net/images/38f79b22-4728-4c16-bee9-966fff07df3f",
    price: 230000,
    score: 640,
  },
  {
    "id": "ndHkNPUpGPiF4nmqX0PL",
    "title": "한 땀 한 땀 꽃을 수 놓다 - 보태니컬 입체 프랑스 자수",
    "coverImage": "https://cdn.class101.net/images/132a560b-ba7f-4564-b5f5-709b934f5ddd",
    price: 320000,
    score: 200,
  },
  {
    "id": "TQw8gmqYK2KrKcP1ibWb",
    "title": "내가 그리고, 네가 간직할 인공의 아이패드 드로잉",
    "coverImage": "https://cdn.class101.net/images/f926a844-cfeb-4983-a39a-fb55a0b3fd0b",
    price: 320000,
    score: 190,
    availableCoupon: false,
  },
  {
    "id": "pHr0phFtcWhsgZhSVe9F",
    "title": "글씨 쓰는 김이영과 함께 아이패드에 그려낸 캘리그라피",
    "coverImage": "https://cdn.class101.net/images/864f377f-93d9-4520-94de-19ca142c432f",
    price: 123000,
    score: 453,
  },
  {
    "id": "4tVyp15jKUO6sfUvLnBc",
    "title": "또 다른 나를 그리다, 동글의 아이패드 캐릭터 드로잉",
    "coverImage": "https://cdn.class101.net/images/0a6a86b9-f1ed-4b90-9d53-cbbb0413989d",
    price: 345000,
    score: 300,
    availableCoupon: false,
  },
  {
    "id": "CNCwXwHP7FUip83z5VEH",
    "title": "평범한 일상에 색을 더하는 시간, 자토의 아이패드 드로잉",
    "coverImage": "https://cdn.class101.net/images/9e7be50d-72f1-4c93-80d6-c6b95b42bd40",
    price: 50000,
    score: 300,
  },
  {
    "id": "vgrdHO9bLqNxDYt4Q7vZ",
    "title": "리노와 아이패드로 시작하는 디지털캘리그라피",
    "coverImage": "https://cdn.class101.net/images/1ea53728-c3f7-4fe9-a485-88c9a130b3b4",
    price: 564000,
    score: 150,
  },
  {
    "id": "gGFsFvhrKlvZpjLRfmNY",
    "title": "디지털로 만들어내는 아날로그 감성, 해란의 아이패드 드로잉",
    "coverImage": "https://cdn.class101.net/images/cbadec97-d306-4669-bbcf-eef5d1a9d261",
    price: 230000,
    score: 220,
  }
];

// coupons.js
const coupons = [
  {
    type: 'rate',
    title: '10% 할인 쿠폰',
    discountRate: 10,
  },
  {
    type: 'amount',
    title: '10,000원 할인 쿠폰',
    discountAmount: 10000,
  }
];

```

# 과제에서 어떤 점을 중요하게 보나요?

---

과제를 통해 이력서에서 볼 수 없는 지원자의 제품 설계 역량과 코드 센스를 확인합니다. 클래스101에서는 주로 아래 항목의 요소들을 중심으로 코드를 평가합니다. 평소대로 과제를 개발 하시되, 평가 요소가 궁금한 경우 아래 항목을 참고하세요.

**Done is better than perfect**

- 적시에 제품을 완성하고 고객의 피드백을 받는 것이 가장 중요합니다
- 완벽한 코드 작성에 앞서 요구사항을 제시간 안에 구현합니다

**유지보수와 확장 용이성**

- OOP에 대한 이해
    - SOLID 원칙
- 제품 아키텍처 설계
    - 책임 분리
    - 코드 간의 적절한 의존성 관리
    - 아키텍처 관련 방법론, 패턴에 대한 이해와 적용 (예: Clean Architecture, DDD, MVC, MVVM, ...)
- 적절한 수준의 추상화

**가독성**

- 의미있는 함수, 변수, 클래스, 컴포넌트의 이름짓기
- 적절한 책임 단위로 쪼개어진 코드 파일
- 일관된 코드 형식

**효율성**

- React 렌더링 과정에서 성능에 영향을 끼치는 요소에 대한 이해
- React 컴포넌트 라이프사이클의 적절한 사용
- 브라우저 혹은 네이티브 앱 환경과 React가 상호작용하는 과정에 대한 이해
- 프로젝트에 적절한 외부 라이브러리 선택
- 시간 복잡도에 대한 이해

**협업**

- 의미있는 커밋 메세지
- 적절한 단위로 쪼갠 커밋
- 명확하지 않은 서버 API가 제공된 상황에서의 개발

**React**

- 컴포넌트 재사용성
- 적절한 state management 전략 채택
- [Thinking in React (https://reactjs.org/docs/thinking-in-react.html)](https://reactjs.org/docs/thinking-in-react.html)

---

아래 항목은 요구사항에 포함되지 않기 때문에 구현하지 않아도 괜찮으나, 추가적으로 지원자의 역량을 파악하기 위해 참고하는 항목입니다.

**UI/UX**

- 사용자의 경험을 고려한 UI/UX 구현
- 적절한 애니메이션 사용

**도구 활용**

- 적절한 툴과 스크립트를 이용한 반복적인 작업 효율화
- typescript, flow 등을 이용한 정적 타입 분석

**테스트**

- 적절한 테스트 환경 구축
- Unit, Integration, E2E 테스트에 대한 이해와 적절한 사용