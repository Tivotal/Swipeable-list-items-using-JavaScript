/* Created by Tivotal */

const items = document.querySelectorAll(".list-item");

//looping through items
items.forEach((item) => {
  //event listeners to each item

  item.addEventListener("touchstart", (e) => {
    e.target.dataset.x =
      Number(e.touches[0].pageX) + Number(e.target.dataset.move) || 0;
  });

  item.addEventListener("touchmove", (e) => {
    let moveX = Number(e.target.dataset.x) - e.touches[0].pageX;

    moveX > 130 ? (moveX = 130) : null;
    moveX < -130 ? (moveX = -130) : null;

    e.target.dataset.move = moveX;

    //animeJS functions
    const timeline = anime.timeline({
      duration: 300,
    });

    timeline.add({
      targets: e.target,
      translateX: -Number(e.target.dataset.move),
    });
  });

  item.addEventListener("touchend", (e) => {
    let elementMove = e.target.dataset.move;

    if (elementMove > 100) {
      elementMove = 100;
    } else if (elementMove < -100) {
      elementMove = -100;
    } else {
      elementMove = 0;
    }

    //looping through the items again
    items.forEach((item) => {
      let content = item.querySelector(".item-content");

      if (content === e.target) {
        return null;
      }

      content.dataset.x = 0;
      content.dataset.move = 0;
      //animeJS functions
      const timeline = anime.timeline({
        duration: 300,
      });

      timeline.add({
        targets: content,
        translateX: 0,
      });
    });

    setTimeout(() => {
      //animeJS functions
      const timeline = anime.timeline({
        duration: 300,
      });

      timeline.add({
        targets: e.target,
        translateX: -Number(elementMove),
      });
    }, 1);
  });
});
