$(function () {
  $('body').sakura({
    newOn: 300,
  });
});

// Hàm random mà không trùng
function getRandomPosition(positions) {
  // Chọn ngẫu nhiên một chỉ số trong mảng
  const index = Math.floor(Math.random() * positions.length);
  const position = positions[index];

  // Loại bỏ vị trí đã chọn khỏi mảng
  positions.splice(index, 1);

  return position;
}

document.addEventListener('DOMContentLoaded', () => {
  const lixiItems = document.querySelectorAll('.lixi');

  // Mảng chứa URL hình ảnh cho bao lì xì
  const lixiImages = [
    'lixi-1.png',
    'lixi-2.png',
    'lixi-3.png',
    'lixi-4.png',
    'lixi-5.png',
    'lixi-6.png',
  ];

  const positions = [
    { left: 72.61, top: 17.0 },
    { left: 47.17, top: 29.9 },
    { left: 29.5, top: 37.9 },
    { left: 49.06, top: 72.2 },
    { left: 77.28, top: 65.0 },
    { left: 8.17, top: 61.4 },
  ];

  // Ví dụ sử dụng
  let availablePositions = [...positions]; // Tạo bản sao của mảng để giữ nguyên mảng gốc
  let availableImages = [...lixiImages];

  lixiItems.forEach((lixi) => {
    const img = lixi.querySelector('img');

    // Random vị trí
    const randomPosition = getRandomPosition(availablePositions);
    const randomX = randomPosition.left;
    const randomY = randomPosition.top;

    lixi.style.left = `${randomX}%`;
    lixi.style.top = `${randomY}%`;

    // Random ảnh
    const randomPositionImage = getRandomPosition(availableImages);
    img.src = './assets/img/' + randomPositionImage;
  });
});

function handleClickLixi() {
  // Mảng chứa message cho chúc mừng
  const chucMungMessages = [
    '🎉 Chúc mừng năm mới! Chúc bạn một năm tràn đầy niềm vui, sức khỏe dồi dào và thành công vượt bậc! 🎆',
    '🌸 Tết đến xuân về, chúc bạn vạn sự như ý, mọi khó khăn đều qua đi, chỉ còn lại niềm vui và hạnh phúc! 🌟',
    '💰 Chúc bạn năm mới an khang thịnh vượng, gia đình ấm no, và luôn gặp may mắn trên mọi nẻo đường! 🍀',
    '❤️ Năm mới, chúc bạn đón nhận thật nhiều yêu thương, hạnh phúc ngập tràn và sức khỏe mãi vững bền! 🌈',
    '🌟 Chúc bạn một năm mới thật rực rỡ, mọi dự định đều thành công, và những khoảnh khắc tuyệt vời luôn bên bạn! 🎊',
    '🎁 Chúc bạn năm mới phát tài phát lộc, mọi công việc đều thuận lợi, gia đình hạnh phúc và vui vẻ! 🏡',
  ];

  // Mảng chứa message cho bao lì xì
  const lixiMessages = [
    'Mình xin lì xì 💲',
    'Xin 10k nhé 💵',
    'Xin 20k nhé 💶',
    'Xin 30k nhé 💷',
    'Xin 50k nhé 💸',
  ];

  // file qr
  const filePathQR = './assets/qr/qr.jpg';
  // có qr hay không
  const showQR = true;

  let availableMessages = [...chucMungMessages];
  let availableLixiMessages = [...lixiMessages];

  const lixiItems = document.querySelectorAll('.lixi');
  const card = document.querySelector('.card');
  const messageElement = document.getElementById('message');
  const imageElement = document.getElementById('image');

  function closeCurrentCard() {
    const card = document.querySelector('.card');
    card.style.display = 'none';
    messageElement.style.display = 'none';
    imageElement.style.display = 'none';
  }

  function showCard(message, lixiMessage, hasQR) {
    closeCurrentCard();

    card.style.display = 'flex';
    messageElement.style.display = 'block';
    messageElement.textContent = message;

    if (hasQR) {
      messageElement.textContent = lixiMessage;
      imageElement.style.display = 'block';
      imageElement.src = filePathQR;
      return;
    }
  }

  lixiItems.forEach((lixi) => {
    lixi.addEventListener('click', function () {
      if (availableMessages.length > 0) {
        const message = getRandomPosition(availableMessages);
        const hasQR = showQR ? Math.random() < 0.4 : false; // 60% chance for QR
        if (hasQR) {
          const lixiMessage = getRandomPosition(availableLixiMessages);
          showCard(message, lixiMessage, hasQR);
        } else {
          showCard(message, null, hasQR);
        }

        // Disable clicked li xi
        this.style.opacity = '0.5';
        this.style.pointerEvents = 'none';
      }
    });
  });

  document.addEventListener('click', function (event) {
    if (!card.contains(event.target) && !event.target.closest('.lixi')) {
      closeCurrentCard();
    }
  });
}

function handleMusic() {
  const audio = document.getElementById('bgMusic');
  
  // Mặc định âm thanh ở chế độ muted (tắt âm thanh)
  audio.muted = true;

  window.addEventListener('load', () => {
    // Phát âm thanh ở chế độ muted khi trang tải
    audio.play().then(() => {
      console.log('Âm thanh đã được phát nhưng ở chế độ tắt âm thanh');
    }).catch((error) => {
      console.log('Không thể phát nhạc:', error);
    });
  });

  // Sau khi người dùng tương tác, bỏ chế độ muted
  document.body.addEventListener('click', () => {
    audio.muted = false;  // Tắt chế độ muted
    audio.play().then(() => {
      console.log('Âm thanh đã phát với âm thanh');
    }).catch((error) => {
      console.log('Không thể phát nhạc:', error);
    });
  });
}
handleClickLixi();
handleMusic();