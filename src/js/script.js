jQuery(function ($) {
  /* --------------------------------------------
  /* 共通機能（全ページで使用）
  /* -------------------------------------------- */

  /* --------------------------------------------
  /* ハンバーガーメニュー(topページ)
  /* -------------------------------------------- */
  $(function () {
    // ハンバーガーメニューのクリック
    $('.js-hamburger').on('click', function () {
      $(this).toggleClass('is-active');             // ハンバーガー自身に is-active
      $('.js-header-nav').toggleClass('is-active'); // ナビを開閉
      $('.js-header').toggleClass('is-active');     // ヘッダー全体
      $('body').toggleClass('is-fixed');            // 背景スクロール制御

      // ロゴ差し替え（SP・PC共通）
      const $logoImg = $('.header__logo img');
      if ($('.js-header').hasClass('is-active')) {
        $logoImg.attr('src', './assets/images/common/tetote-logo.svg'); // 黒ロゴ
      } else {
        $logoImg.attr('src', './assets/images/common/tetote-logo-white.svg'); // 白ロゴ
      }
    });

    // ナビ内のリンクをクリックしたら閉じる
    $('.js-header-link').on('click', function () {
      $('.js-hamburger').removeClass('is-active');
      $('.js-header-nav').removeClass('is-active');
      $('.js-header').removeClass('is-active');
      $('body').removeClass('is-fixed');

      // ロゴを白に戻す（SP・PC共通）
      $('.header__logo img').attr('src', './assets/images/common/tetote-logo-white.svg');
    });
  });

  /* --------------------------------------------
  /* headerをFVの下までスクロールした時に、page-headerと同じデザインに変える
  /* -------------------------------------------- */
  $(function () {
    // トップページのみで実行
    if ($('#top-fv').length) {
      const $header = $('.js-header');
      const $topFv = $('#top-fv');
      const $logoImg = $('.header__logo img');
      
      // FVセクションの高さを取得
      const fvHeight = $topFv.outerHeight();
      
      // スクロールイベント
      $(window).on('scroll', function () {
        const scrollTop = $(window).scrollTop();
        
        if (scrollTop > fvHeight) {
          // FVを過ぎたらヘッダーにクラスを追加
          $header.addClass('is-scrolled');
          // ロゴを黒に変更
          $logoImg.attr('src', './assets/images/common/tetote-logo.svg');
        } else {
          // FV内にいる場合はクラスを削除
          $header.removeClass('is-scrolled');
          // ロゴを白に戻す
          $logoImg.attr('src', './assets/images/common/tetote-logo-white.svg');
        }
      });
    }
  });


  /* --------------------------------------------
  /* index.html(topページ)専用機能
  /* -------------------------------------------- */

  /* --------------------------------------------
  /* index.html(topページ)
  //各セクションの要素をふわっと表示させる（topページ）
  //スクロールしてセクションまで来たら、ふわっと表示
  /* -------------------------------------------- */
  $(function () {
    // トップページのみで実行
    if ($('#top-fv').length) {
      // アニメーション対象の要素を取得
      const $fadeElements = $('.js-fade-in');
      
      // 要素が画面に入ったかチェックする関数
      function checkFadeIn() {
        $fadeElements.each(function () {
          const $element = $(this);
          const elementTop = $element.offset().top;
          const elementBottom = elementTop + $element.outerHeight();
          const windowTop = $(window).scrollTop();
          const windowBottom = windowTop + $(window).height();
          
          // 要素が画面に入ったらクラスを追加
          if (elementBottom > windowTop && elementTop < windowBottom) {
            $element.addClass('is-animated');
          }
        });
      }
      
      // 初期状態で既に画面内にある要素をチェック
      checkFadeIn();
      
      // スクロール時にチェック
      $(window).on('scroll', checkFadeIn);
    }
  });


/* --------------------------------------------
/* index.html(topページ)
// js-top-fv-swiper (topページFVのスワイパー)
//2枚の画像をふわっと表示で切り替える
/* -------------------------------------------- */
$(function () {
  // トップページのみで実行
  if ($('#top-fv').length) {
    const topFvSwiper = new Swiper('.js-top-fv-swiper', {
      // 基本設定
      loop: true,                    // ループ再生
      autoplay: {
        delay: 3000,                 // 3秒間隔で自動切り替え
        disableOnInteraction: false, // ユーザー操作後も自動再生を継続
      },
      effect: 'fade',                // フェード効果
      fadeEffect: {
        crossFade: true,             // クロスフェード
      },
      speed: 5000,                   // 切り替え速度（5秒）
      
      // ページネーション（必要に応じて）
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      
      // ナビゲーション（必要に応じて）
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
});


  
/* --------------------------------------------
/* index.html(topページ)
// js-top-message-swiper (topページのメッセージスワイパー)
//自動で止まらずに延々と横スライドし続けるスライダーにする
/* -------------------------------------------- */
$(function () {
  // トップページのみで実行
  if ($('#top-fv').length) {
    const topMessageSwiper = new Swiper('.js-top-message-swiper', {
      // 基本設定
      loop: true,                    // ループ再生
      autoplay: {
        delay: 0,                    // 遅延なし
        disableOnInteraction: false, // ユーザー操作後も自動再生を継続
        reverseDirection: false,     // 通常方向
      },
      speed: 8000,                   // 8秒かけてスライド
      freeMode: {
        enabled: true,               // フリーモード
        momentum: false,             // 慣性を無効
      },
      slidesPerView: 'auto',         // スライド幅を自動調整
      spaceBetween: 34,              // スライド間の余白34px
      
      // ページネーション
      pagination: {
        el: '.top-message__pagination',
        clickable: true,
      },
      
      // 無限ループ用の設定
      allowTouchMove: false,         // タッチ操作を無効
    });
  }
});



/* --------------------------------------------
/* index.html(topページ)
// js-top-member-swiper (topページのスタッフカードのスワイパー)
//WordPressのACFから入力したカードがランダムで表示される
/* -------------------------------------------- */
$(function () {
  // トップページのみで実行
  if ($('#top-fv').length) {
    // スタッフカードをランダムに並び替え
    const $swiperWrapper = $('.js-top-member-swiper .swiper-wrapper');
    const $slides = $swiperWrapper.children('.swiper-slide');
    
    // ランダムに並び替え
    const shuffledSlides = $slides.toArray().sort(() => Math.random() - 0.5);
    
    // 並び替えたスライドを再配置
    $swiperWrapper.empty().append(shuffledSlides);
    
    // Swiperを初期化
    const topMemberSwiper = new Swiper('.js-top-member-swiper', {
      // 基本設定
      loop: true,                    // ループ再生
      autoplay: {
        delay: 4000,                 // 4秒間隔で自動切り替え
        disableOnInteraction: false, // ユーザー操作後も自動再生を継続
      },
      speed: 1000,                    // 切り替え速度
      slidesPerView: 1,              // 1枚表示
      spaceBetween: 43,              // スライド間の余白
      
      // ナビゲーション
      navigation: {
        nextEl: '.top-member__next',
        prevEl: '.top-member__prev',
      },
      
      // レスポンシブ設定
      breakpoints: {
        768: {
          slidesPerView: 2,          // PC時は2枚表示
          spaceBetween: 40,          // PC時の余白
        },
        1024: {
          slidesPerView: 3,          // 大画面時は3枚表示
          spaceBetween: 60,          // 大画面時の余白
        }
      }
    });
  }
});



  /* --------------------------------------------
  /* staff-details.html(スタッフ紹介のページ）専用機能
  /* -------------------------------------------- */

  /* --------------------------------------------
  /* staff-details.html(スタッフ紹介のページ）
  //セクションをスクロールした時に、該当する記事まできたら、
  // sidebarの該当目次の色を$blackに変える(is-activeのつけはずし)
  // (interview-slider-bar__list)
  /* -------------------------------------------- */



  /* --------------------------------------------
  /* staff-details.html(スタッフ紹介のページ)
  // other-members__listは、ランダム表示
  /* -------------------------------------------- */



  /* --------------------------------------------
  /* details.html, faq.html (募集要項とFAQページ)専用機能
  /* -------------------------------------------- */

  /* --------------------------------------------
  /* details.html, faq.html (募集要項とFAQページ)
  // category-tag__itemをクリックしたら、該当のセクションまでスクロールする
  /* -------------------------------------------- */


  
  /* --------------------------------------------
  /* entry.html (エントリーページ）専用機能
  /* -------------------------------------------- */

  /* --------------------------------------------
  /* entry.html (エントリーページ）
  // フォームのバリデーション
  //入力がない場合送信ボタンを押せない様にする
  /* -------------------------------------------- */
});