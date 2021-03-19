<template>
  <div class="footer">
    <div class="wrapper">
      <div class="footer__content">
        <div class="footer__top-row">
          <img class="logo" src="@/assets/images/logo.png" alt="Star Wars" />
          <div class="social-links">
            <a class="social-link" href="https://facebook.com" target="_blank">
              <img
                class="social-icon"
                src="@/assets/images/icon-facebook.svg"
                alt="link to facebook"
              />
            </a>
            <a class="social-link" href="https://instagram.com" target="_blank">
              <img
                class="social-icon"
                src="@/assets/images/icon-instagram.svg"
                alt="link to instagram.svg"
              />
            </a>
          </div>
        </div>
        <div class="footer__bottom-row">
          <span class="rights">All rights Reserved.</span>
          <a class="policy" href="#" target="_blank">Privacy Policy</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  height: 195px;
  background: #f2eeee;

  &__top-row {
    display: flex;
    justify-content: space-between;
    padding-top: 43px;
  }

  .logo {
    width: 136px;
    height: 40px;
  }

  .social-link {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-left: 16px;

    text-align: center;
    background: #ff634a;
    border-radius: 6px;
    transition: background 0.3s;

    &:hover {
      background: #fd4326;
    }
  }

  .social-icon {
    position: relative;
    height: 16px;
    top: 50%;
    transform: translateY(-50%);
  }

  &__bottom-row {
    display: flex;
    justify-content: space-between;
    margin-top: 66px;

    .rights,
    .policy {
      font-family: "HelveticaThin", sans-serif;
      letter-spacing: 0.07em;
      color: #100f0f;
    }

    .policy {
      text-decoration: none;
    }
  }

  @media (max-width: 768px) {
    .logo {
      margin-bottom: 24px;
      width: 82px;
      height: 24px;
    }

    &__top-row {
      flex-direction: column;
    }

    .social-link {
      width: 32px;
      height: 32px;
      margin-right: 13px;
      margin-left: 0;
    }

    &__bottom-row {
      margin-top: 40px;
    }
  }
}
</style>
