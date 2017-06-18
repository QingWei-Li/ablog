import Flash from "@/components/Flash";
import Upload from "@/components/Upload";
import "@/styles/PageLogin.styl";
import { http } from "@/utils";
import * as md5 from "md5";
import { Component, h } from "preact";
import { route } from "preact-router";

interface ILoginState {
  isNew: boolean;
  error?: string;
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

const Signup = ({ linkState, checkName, onSubmit, formData }) =>
  <form onSubmit={onSubmit}>
    <fieldset>
      <label for="nameField">用户名</label>
      <input
        onInput={linkState("formData.name")}
        value={formData.name}
        onChange={checkName}
        type="text"
        required={true}
        id="nameField"
      />
      <label for="emailField">邮箱</label>
      <input
        onInput={linkState("formData.email")}
        value={formData.email}
        type="email"
        required={true}
        id="emailField"
      />
      <label for="passwordField">密码</label>
      <input
        onInput={linkState("formData.password")}
        value={formData.password}
        type="password"
        required={true}
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
  public state: ILoginState = { isNew: false, formData: {}, error: "" };

  public clearError() {
    this.setState({ error: "" });
  }

  public showError(error: string) {
    this.setState({ error });
  }

  public submitSignin = async (e: Event) => {
    const { password, nameOrEmail } = this.state.formData;
    this.clearError();
    e.preventDefault();

    if (!password || !nameOrEmail) {
      this.showError("账号和密码必填");
      return;
    }

    if (!/^[\w\.\@]+$/g.test(nameOrEmail)) {
      this.showError("账号只支持字母、数字和邮箱");
      return;
    }

    const data: any = {
      password: md5(password)
    };

    if (/^[\w\.]+\@[\w\.]+$/g.test(nameOrEmail)) {
      data.email = nameOrEmail;
    } else {
      data.name = nameOrEmail;
    }

    try {
      await http.post("/signin", data);
      route("/");
    } catch (err) {
      this.showError("登录失败，用户名或密码错误");
    }
  };

  public submitSignup = async (e: Event) => {
    this.clearError();
    e.preventDefault();
    const formData = this.state.formData;

    if (!/^\w+$/g.test(formData.name)) {
      this.showError("用户名只支持数字、字母和短横线");
      return;
    }

    if (!/^[\w\.]+\@[\w\.]+$/g.test(formData.email)) {
      this.showError("请输入正确的邮箱");
      return;
    }

    if (!formData.password) {
      this.showError("请输入密码");
      return;
    }

    formData.password = md5(formData.password);

    try {
      await http.post("/user", formData);
      route("/");
    } catch (err) {
      this.showError(err.response && err.response.data.message);
    }
  };

  public togglePanel = () => {
    this.clearError();
    this.setState({ isNew: !this.state.isNew });
  };

  public checkName = async (e: any) => {
    const name = e.target.value;
    const result = await http.get("/user/check/" + name);

    if (result.data.message) {
      this.showError(`${name} 用户名已被占用`);
    }
  };

  public render({}, { isNew, formData, error }: ILoginState) {
    const linkState = this.linkState.bind(this);

    return (
      <section class="Login">
        <MainBanner />
        {error ? <Flash type="error">{error}</Flash> : ""}
        {isNew
          ? <Signup
              checkName={this.checkName}
              linkState={linkState}
              formData={formData}
              onSubmit={this.submitSignup}
            />
          : <Signin
              linkState={linkState}
              formData={formData}
              onSubmit={this.submitSignin}
            />}
        <a onClick={this.togglePanel} href="javascript:void(0)">
          {isNew ? "已有账户？点击登录" : "创建新用户"}
        </a>
      </section>
    );
  }
}
