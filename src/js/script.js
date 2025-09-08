jQuery(function ($) {
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
});
