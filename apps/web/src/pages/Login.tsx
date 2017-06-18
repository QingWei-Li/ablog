import Flash from "@/components/Flash";
import Upload from "@/components/Upload";
import "@/styles/PageLogin.styl";
import { Component, h } from "preact";

interface ILoginState {
  isNew: boolean;
  formData: {
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
    nameOrEmail?: string;
  };
}

const MainBanner = () =>
  <div class="Login__banner">
    <h1>纸糊专栏</h1>
    <p>爱登录不登录，爱注册不注册</p>
  </div>;

const Signin = ({ onSubmit, formData, linkState }) =>
  <form onSubmit={onSubmit}>
    <fieldset>
      <label for="nameOrEmailField">用户名或邮箱</label>
      <input
        onInput={linkState("formData.nameOrEmail")}
        value={formData.nameOrEmail}
        type="text"
        id="nameOrEmailField"
      />
      <label for="passwordField">密码</label>
      <input
        onInput={linkState("formData.password")}
        value={formData.password}
        type="password"
        id="passwordField"
      />
      <input class="button-primary" type="submit" value="登录" />
    </fieldset>
  </form>;

const Signup = ({ linkState, onSubmit, formData }) =>
  <form onSubmit={onSubmit}>
    <fieldset>
      <label for="nameField">用户名</label>
      <input
        onInput={linkState("formData.name")}
        value={formData.name}
        type="text"
        id="nameField"
      />
      <label for="emailField">邮箱</label>
      <input
        onInput={linkState("formData.email")}
        value={formData.email}
        type="text"
        id="emailField"
      />
      <label for="passwordField">密码</label>
      <input
        onInput={linkState("formData.password")}
        value={formData.password}
        type="password"
        id="passwordField"
      />
      <fieldset>
        <label for="avatarField">上传头像</label>
        <Upload
          onChange={linkState("formData.avatar")}
          height="256px"
          width="256px"
          id="avatarField"
        >
          <p>点击或者拖拽上传</p>
        </Upload>
      </fieldset>
      <input class="button-primary" type="submit" value="注册" />
    </fieldset>
  </form>;

export default class Login extends Component<any, ILoginState> {
  public state: ILoginState = { isNew: false, formData: {} };

  public submitSignin = (e: Event) => {
    e.preventDefault();
    console.log(23);
  };

  public submitSignup = (e: Event) => {
    e.preventDefault();
    console.log(23);
  };

  public render({}, { isNew, formData }: ILoginState) {
    const linkState = this.linkState.bind(this);

    return (
      <section class="Login">
        <MainBanner />
        {isNew
          ? <Signup
              linkState={linkState}
              formData={formData}
              onSubmit={this.submitSignup}
            />
          : <Signin
              linkState={linkState}
              formData={formData}
              onSubmit={this.submitSignin}
            />}
        <a
          onClick={() => this.setState({ isNew: !this.state.isNew })}
          href="javascript:void(0)"
        >
          {isNew ? "已有账户？点击登录" : "创建新用户"}
        </a>
      </section>
    );
  }
}
