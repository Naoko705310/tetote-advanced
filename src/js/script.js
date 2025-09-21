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
    $('body').toggleClass('is-fixed');            // スクロール制御

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
    $('body').removeClass('is-fixed');            // スクロール制御解除

    // ロゴを白に戻す（SP・PC共通）
    $('.header__logo img').attr('src', './assets/images/common/tetote-logo-white.svg');
  });
});
  // /* --------------------------------------------
  // /* ハンバーガーメニュー(topページ)
  // /* -------------------------------------------- */
  // $(function () {
  //   // ハンバーガーメニューのクリック
  //   $('.js-hamburger').on('click', function () {
  //     $(this).toggleClass('is-active');             // ハンバーガー自身に is-active
  //     $('.js-header-nav').toggleClass('is-active'); // ナビを開閉
  //     $('.js-header').toggleClass('is-active');     // ヘッダー全体
  //     $('body').toggleClass('is-fixed');            // 背景スクロール制御

  //     // ロゴ差し替え（SP・PC共通）
  //     const $logoImg = $('.header__logo img');
  //     if ($('.js-header').hasClass('is-active')) {
  //       $logoImg.attr('src', './assets/images/common/tetote-logo.svg'); // 黒ロゴ
  //     } else {
  //       $logoImg.attr('src', './assets/images/common/tetote-logo-white.svg'); // 白ロゴ
  //     }
  //   });

  //   // ナビ内のリンクをクリックしたら閉じる
  //   $('.js-header-link').on('click', function () {
  //     $('.js-hamburger').removeClass('is-active');
  //     $('.js-header-nav').removeClass('is-active');
  //     $('.js-header').removeClass('is-active');
  //     $('body').removeClass('is-fixed');

  //     // ロゴを白に戻す（SP・PC共通）
  //     $('.header__logo img').attr('src', './assets/images/common/tetote-logo-white.svg');
  //   });
  // });

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
      loopAdditionalSlides: 2,       // ループ用の追加スライド数
      autoplay: {
        delay: 4000,                 // 4秒間隔で自動切り替え
        disableOnInteraction: false, // ユーザー操作後も自動再生を継続
      },
      speed: 1000,                   // 切り替え速度
      slidesPerView: 'auto',         // 自動幅調整
      spaceBetween: 23,              // スライド間の余白
      
      // 左端から開始、右端まで余白なく表示
      centeredSlides: false,         // 中央寄せを無効
      freeMode: {
        enabled: true,               // フリーモードでスムーズなスクロール
      },
      
      // ナビゲーション
      navigation: {
        nextEl: '.top-member__next',
        prevEl: '.top-member__prev',
      },
      
      // レスポンシブ設定
      breakpoints: {
        768: {
          slidesPerView: 3.5,        // PC時は3.5枚表示
          spaceBetween: 43,          // PC時の余白も43px
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
$(function () {
  // スタッフ詳細ページのみで実行
  if ($('.staff-interview__section').length) {
    const $sidebarLinks = $('.interview-sidebar__link');
    const $sections = $('.staff-interview__section');
    
    // 目次リンクのクリックイベント
    $sidebarLinks.on('click', function (e) {
      e.preventDefault();
      
      const targetId = $(this).attr('href');
      const $targetSection = $(targetId);
      
      if ($targetSection.length) {
        // 既存のマージンをリセット
        $sections.removeClass('has-scroll-margin');
        
        // クリックされたセクションにマージンを追加
        $targetSection.addClass('has-scroll-margin');
        
        // スムーズスクロール
        $('html, body').animate({
          scrollTop: $targetSection.offset().top - 121 // ヘッダー高さ分を引く
        }, 800);
      }
    });
    
    // スクロールイベント
    $(window).on('scroll', function () {
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      const offset = windowHeight / 3; // 画面の1/3の位置で判定
      
      let currentSection = '';
      
      // 各セクションをチェック
      $sections.each(function () {
        const $section = $(this);
        const sectionTop = $section.offset().top;
        const sectionHeight = $section.outerHeight();
        
        // セクションが画面の1/3の位置を過ぎた場合
        if (scrollTop + offset >= sectionTop && scrollTop + offset < sectionTop + sectionHeight) {
          currentSection = $section.attr('id');
        }
      });
      
      // サイドバーのリンクのアクティブ状態を更新
      $sidebarLinks.removeClass('is-active');
      if (currentSection) {
        $sidebarLinks.filter(`[href="#${currentSection}"]`).addClass('is-active');
      }
    });
    
    // 初期状態で最初のセクションをアクティブにする
    $(window).trigger('scroll');
  }
});


/* --------------------------------------------
/* staff-details.html(スタッフ紹介のページ)
// other-members__listは、ランダム表示
/* -------------------------------------------- */
$(function () {
  // スタッフ詳細ページのみで実行
  if ($('.other-members__items').length) {
    const $otherMembersList = $('.other-members__items');
    const $memberItems = $otherMembersList.children('.other-members__item');
    
    // ランダムに並び替え
    const shuffledItems = $memberItems.toArray().sort(() => Math.random() - 0.5);
    
    // 並び替えたアイテムを再配置
    $otherMembersList.empty().append(shuffledItems);
  }
});



  /* --------------------------------------------
  /* details.html, faq.html (募集要項とFAQページ)専用機能
  /* -------------------------------------------- */

/* --------------------------------------------
/* details.html, faq.html (募集要項とFAQページ)
// category-tag__itemをクリックしたら、該当のセクションまでスクロールする
/* -------------------------------------------- */
$(function () {
  // details.html, faq.htmlページのみで実行
  if ($('.category-tag__link').length) {
    const $categoryLinks = $('.category-tag__link');
    const headerHeight = $('.js-header').outerHeight() || 100; // ヘッダーの高さを取得
    
    // カテゴリータグのクリックイベント
    $categoryLinks.on('click', function (e) {
      e.preventDefault();
      
      const targetId = $(this).attr('href');
      const $targetSection = $(targetId);
      
      if ($targetSection.length) {
        // スムーズスクロール（ヘッダー高さ分を引く）
        $('html, body').animate({
          scrollTop: $targetSection.offset().top - headerHeight - 20 // ヘッダー高さ + 余白20px
        }, 800);
      }
    });
  }
});

/* --------------------------------------------
/* faq.html (FAQページ）
// FAQアコーディオンの開閉機能
/* -------------------------------------------- */
$(function () {
  // FAQページのみで実行
  if ($('.faq-list__question').length) {
    const $faqQuestions = $('.faq-list__question');
    
    // FAQ質問のクリックイベント
    $faqQuestions.on('click', function () {
      const $question = $(this);
      const $answer = $question.next('.faq-list__answer');
      const isExpanded = $question.attr('aria-expanded') === 'true';
      
      if (isExpanded) {
        // 閉じる処理
        $question.attr('aria-expanded', 'false');
        $answer.slideUp(300);
      } else {
        // 開く処理
        $question.attr('aria-expanded', 'true');
        $answer.slideDown(300);
      }
    });
  }
});






  
  /* --------------------------------------------
  /* entry.html (エントリーページ）専用機能
  /* -------------------------------------------- */

  /* --------------------------------------------
/* entry.html (エントリーページ）
// フォームのバリデーション
//入力がない場合送信ボタンを押せない様にする
/* -------------------------------------------- */

$(function () {
  // エントリーページのみで実行
  if ($('.entry-form').length) {
    const $form = $('.entry-form');
    const $submitBtn = $('.entry-form__submit');
    const $requiredFields = $form.find('[required]');
    const $errorMessage = $('.entry-form__error-message'); // HTMLから取得
    
    // 初期状態で送信ボタンを無効化
    $submitBtn.prop('disabled', true);
    
    // 必須項目の入力チェック関数
    function checkRequiredFields() {
      let isValid = true;
      
      $requiredFields.each(function () {
        const $field = $(this);
        const value = $field.val().trim();
        
        if (value === '') {
          isValid = false;
          return false;
        }
        
        if ($field.attr('type') === 'radio') {
          const $radioGroup = $field.closest('.entry-form__radio-group');
          if ($radioGroup.find('input[type="radio"]:checked').length === 0) {
            isValid = false;
            return false;
          }
        }
        
        if ($field.attr('type') === 'checkbox') {
          if (!$field.is(':checked')) {
            isValid = false;
            return false;
          }
        }
      });
      
      // 送信ボタンの状態を更新
      $submitBtn.prop('disabled', !isValid);
      
      // エラーメッセージの表示/非表示
      if (isValid) {
        $errorMessage.hide();
      } else {
        $errorMessage.show();
      }
    }
    
    // 入力時のイベント
    $requiredFields.on('input change', function () {
      checkRequiredFields();
    });
    
    // ラジオボタン・チェックボックスのイベント
    $form.find('input[type="radio"], input[type="checkbox"]').on('change', function () {
      checkRequiredFields();
    });
    
    // 初期チェック
    checkRequiredFields();
    
    // 送信時の処理を追加
    $form.on('submit', function (e) {
      e.preventDefault(); // 本来の送信を止める（サーバー送信不要の場合）
      if (!$submitBtn.prop('disabled')) {
        window.location.href = 'entry-thanks.html'; // サンクスページに遷移
      } else {
        $errorMessage.show(); // 念のためバリデーションNGならエラーを表示
      }
    });
  }
});



// $(function () {
//   // エントリーページのみで実行
//   if ($('.entry-form').length) {
//     const $form = $('.entry-form');
//     const $submitBtn = $('.entry-form__submit');
//     const $requiredFields = $form.find('[required]');
//     const $errorMessage = $('.entry-form__error-message'); // HTMLから取得
    
//     // 初期状態で送信ボタンを無効化
//     $submitBtn.prop('disabled', true);
    
//     // 必須項目の入力チェック関数
//     function checkRequiredFields() {
//       let isValid = true;
      
//       $requiredFields.each(function () {
//         const $field = $(this);
//         const value = $field.val().trim();
        
//         // 値が空の場合は無効
//         if (value === '') {
//           isValid = false;
//           return false; // ループを抜ける
//         }
        
//         // ラジオボタンの場合
//         if ($field.attr('type') === 'radio') {
//           const $radioGroup = $field.closest('.entry-form__radio-group');
//           if ($radioGroup.find('input[type="radio"]:checked').length === 0) {
//             isValid = false;
//             return false;
//           }
//         }
        
//         // チェックボックスの場合
//         if ($field.attr('type') === 'checkbox') {
//           if (!$field.is(':checked')) {
//             isValid = false;
//             return false;
//           }
//         }
//       });
      
//       // 送信ボタンの状態を更新
//       $submitBtn.prop('disabled', !isValid);
      
//       // エラーメッセージの表示/非表示
//       if (isValid) {
//         $errorMessage.hide();
//       } else {
//         $errorMessage.show();
//       }
//     }
    
//     // 入力時のイベント
//     $requiredFields.on('input change', function () {
//       checkRequiredFields();
//     });
    
//     // ラジオボタン・チェックボックスのイベント
//     $form.find('input[type="radio"], input[type="checkbox"]').on('change', function () {
//       checkRequiredFields();
//     });
    
//     // 初期チェック
//     checkRequiredFields();
//   }
// });






});