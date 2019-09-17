export const CITY = [
  'Hà Nội',
  'Đà Nẵng',
  'Hồ Chí Minh',
  'Huế',
  'Quang Ninh',
  'Thanh Hoá',
];

export const GENDER = [
  {
    id: 'Nam',
    text: 'Nam',
  },
  {
    id: 'Nữ',
    text: 'Nữ',
  },
];

export const RARE_TYPE = [
  {
    id: 'Rh+',
    text: 'Rh+',
  },
  {
    id: 'Rh-',
    text: 'Rh-',
  },
];

export const BLOOD_TYPES = [
  {
    id: 1,
    text: 'Máu nóng',
  },
  {
    id: 2,
    text: 'Tập trung',
  },
];

export const BLOOD_GROUP = [
  {
    id: 'O',
    text: 'O',
  },
  {
    id: 'A',
    text: 'A',
  },
  {
    id: 'B',
    text: 'B',
  },
  {
    id: 'AB',
    text: 'AB',
  },
  {
    id: 'Chưa biết',
    text: 'Chưa biết',
  },
];

export const DONATION_TIMES = [
  {
    id: 'Toàn thời gian',
    text: 'Toàn thời gian',
  },
  {
    id: 'Giờ hàng chính',
    text: 'Giờ hàng chính',
  },
  {
    id: 'Ngoài giờ hàng chính',
    text: 'Ngoài giờ hàng chính',
  },
  {
    id: 'Tuỳ lúc',
    text: 'Tuỳ lúc',
  },
  {
    id: 'Chuyển về địa phương',
    text: 'Chuyển về địa phương',
  },
];

export const DONATION_STATUS = [
  {
    id: 'Chi hiến toàn phần',
    text: 'Chi hiến toàn phần',
  },
  {
    id: 'Hiến được tiểu cầu',
    text: 'Hiến được tiểu cầu',
  },
  {
    id: 'Có thể hiến tiểu cầu',
    text: 'Có thể hiến tiểu cầu',
  },
  {
    id: 'Cần lưu ý',
    text: 'Cần lưu ý',
  },
  {
    id: 'Không thể hiến',
    text: 'Không thể hiến',
  },
];

export const DONATION_METHOD = [
  {
    id: 1,
    text: 'Toàn phần',
  },
  {
    id: 2,
    text: 'Tiểu cầu',
  },
];

export const DUMMY_USER_DATA = [
  {
    id: 'a',
    name: 'Đoàn Ánh',
    avatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    address: 'Ngũ Hành Sơn, TP Đà Nẵng',
    phoneNumber: '+84128947211',
    birthday: '23/4/1988',
    lastBooking: {
      date: '9/8/2018 9:10 AM',
      des: 'Bị viêm Xoang mãng tính đang theo dõi...',
    },
    bloodGroup: 'A',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
  {
    id: 'b',
    name: 'Nguyễn Thanh Minh Hiếu',
    avatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    address: 'Hải Châu, TP Đà Nẵng',
    phoneNumber: '+8412204422',
    birthday: '12/6/1986',
    lastBooking: {
      date: '9/8/2018 9:10 AM',
      des: 'Bị mỡ trong máu đang theo dõi...',
    },
    bloodGroup: 'B',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
  {
    id: 'c',
    name: 'Nguyễn Văn A',
    avatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    address: 'Ba Đình, TP Hà Nội',
    phoneNumber: '+843423122233',
    birthday: '12/6/1980',
    lastBooking: {
      date: '9/8/2018 9:10 AM',
      des: 'Bị Tiểu Đường mãng tính đang theo dõi...',
    },
    bloodGroup: 'AB',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
  {
    id: 'd',
    name: 'Lê thị B',
    avatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    address: 'Hà Đong, TP Hà Nội',
    phoneNumber: '+8422222333',
    birthday: '23/4/1999',
    lastBooking: {
      date: '9/8/2018 9:10 AM',
      des: 'Mắc bệnh ung thư đang theo dõi...',
    },
    bloodGroup: 'O',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
];

export const PURCHASE_SERVICES = [
  'Download Feature Enable',
  'Remove Ads',
  'Unlock All Sections',
];
export const PURCHASE_LEVELS = [
  {
    title: 'Annually',
    trialText: '3-days trial',
    trialTime: 3,
    trialTimeUnit: 'day',
    price: 99.99,
    priceText: '$99.99',
    purchaseUnit: 'year',
    currency: 'USD',
    subscriptionFreeTrialPeriod: 'P3D',
    productId: 'com.educationapps.learnenglish.subscription.year',
    subscriptionPeriod: 'P1Y',
  },
  {
    title: 'Monthly',
    trialText: '3-days trial',
    trialTime: 0,
    trialTimeUnit: 'day',
    price: 9.99,
    priceText: '$9.99',
    currency: 'USD',
    purchaseUnit: 'month',
    subscriptionPeriod: 'P1M',
    productId: 'com.educationapps.learnenglish.subscription.month',
    subscriptionFreeTrialPeriod: 'P3D',
  },
  {
    title: 'Weekly',
    trialText: '3-days trial',
    trialTime: 0,
    trialTimeUnit: 'day',
    price: 4.99,
    priceText: '$4.99',
    currency: 'USD',
    purchaseUnit: 'week',
    subscriptionPeriod: 'P1W',
    productId: 'com.educationapps.learnenglish.subscription.week',
    subscriptionFreeTrialPeriod: 'P3D',
  },
];
