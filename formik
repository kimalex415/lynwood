<Formik
        id="formikForm"
        enableReinitialize={true}
        initialValues={this.state.user}
        validationSchema={this.state.schema}
        onSubmit={this.getUser}
      >
        {props => {
          const {
            touched,
            errors,
            handleSubmit,
            isSubmitting,
            isValid
          } = props;
          return (
            <div className="wrapper">
              <div className="block-center mt-4 wd-xl">
                <div className="card card-flat">
                  <div className="card-header text-center register-card-header">
                    <em href="/">
                      <img
                        className="block-center"
                        src="img/lynwoodLogo.png"
                        alt="registerLogo"
                        style={{ width: "250px", height: "70px" }}
                      />
                    </em>
                  </div>
                  <div className="card-body">
                    <p className="text-center py-2">SIGN IN TO CONTINUE.</p>
                    <form
                      className="mb-3"
                      id="registerForm"
                      onSubmit={handleSubmit}
                    >
                      <div className="form-group">
                        <label
                          className="text-muted"
                          labelfor="signupInputEmail1"
                        >
                          Email address
                        </label>
                        <div className="input-group with-focus">
                          <Field
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            className={
                              (errors.email && touched.email && "error",
                              "form-control border-right-0")
                            }
                          />
                          <div className="input-group-append">
                            <span className="input-group-text text-muted bg-transparent border-left-0">
                              <em className="fa fa-envelope" />
                            </span>
                          </div>
                        </div>
                        {errors.email && touched.email && (
                          <div className="input-feedback  text-danger">
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label
                          className="text-muted"
                          labelfor="signupInputPassword1"
                        >
                          Password
                        </label>
                        <div className="input-group with-focus">
                          <Field
                            className={
                              (errors.password && touched.password && "error",
                              "form-control border-right-0")
                            }
                            name="password"
                            type="password"
                            placeholder="Password"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text text-muted bg-transparent border-left-0">
                              <em className="fa fa-lock" />
                            </span>
                          </div>
                        </div>
                        {errors.password && touched.password && (
                          <div className="input-feedback text-danger">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="checkbox c-checkbox float-left mt-0">
                        <label>
                          <input
                            type="checkbox"
                            value=""
                            name="remember"
                            data-parsley-multiple="remember"
                            data-parsley-id="10"
                          />
                          <span className="fa fa-check" />
                          Remember Me
                        </label>
                        <br />
                        <div className="float-right">
                          <a className="text-muted" href="recover.html">
                            Forgot your password?
                          </a>
                        </div>
                      </div>
                      <button
                        className="btn btn-block btn-primary mt-3"
                        type="submit"
                        disabled={isSubmitting || !isValid}
                      >
                        Login
                      </button>
                    </form>
                    <p className="pt-3 text-center">Need to Signup?</p>
                    {this.renderRedirect()}
                    <button
                      className="btn btn-block btn-secondary"
                      type="button"
                      onClick={this.setRedirect}
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
