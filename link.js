
    window.onload=async ()=>{
      const navBar=document.querySelectorAll('.nav-bar-a')
      for (let i = 0; i < navBar.length; i++) {
        navBar[i].onclick = () => {
          console.log('点了');
          navBar[i].style.backgroundColor = 'black';
          navBar[i].style.color = '#fff';
          for (let j = 0; j < navBar.length; j++) {
            if (j !== i) {
              navBar[j].style.backgroundColor = '';
              navBar[j].style.color = '#ccc';
            }
          }
        }}
      //轮播图
      await axios.get('http://1.15.88.222:3000/banner').then(
        res=>{
          console.log(res);

          const{status,data:{banners}}=res

          console.log(status)
          console.log(banners)

          if (status === 200) {
                const wrapper = document.querySelector(".swiper-wrapper") 
                banners.forEach(item => {
                const { imageUrl } = item;
                const newSwiperItem = document.createElement("div")
                newSwiperItem.className = "swiper-slide";
                newSwiperItem.style.background = `url(${imageUrl}) no-repeat`
                newSwiperItem.style.backgroundSize = `100% 100%`
                wrapper.appendChild(newSwiperItem)
          })
              // 初始化轮播图
                new Swiper(".swiper", {
                  direction: "horizontal", // 垂直切换选项
                  loop: true, // 循环模式选项
                  // 如果需要分页器
                  pagination: {
                    el: ".swiper-pagination",
                  },
                  // 如果需要前进后退按钮
                  navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  },
                })
            }
        }
      )
      //列表
      await axios.get('http://1.15.88.222:3000/top/playlist/highquality/tags').then(res=>{
        console.log(res)
        const{status,data:{playlists}}=res
        if (status === 200){
          const content = document.querySelector(".content")
          console.log(status)
          console.log(playlists)
          playlists.forEach(item => {
        const { name, coverImgUrl } = item;
        //获取热门歌单的内容
        const newItem = document.createElement("div");
        const newName = document.createElement("span");
        const newImg = document.createElement("img");
        newItem.className = "item";
        newName.innerText = name;
        newImg.src = coverImgUrl;
        newItem.appendChild(newImg);
        newItem.appendChild(newName);
        content.appendChild(newItem);
      })
        }
      })
    }
