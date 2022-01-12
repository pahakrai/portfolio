const SignUp = () => {
  return (
    <div className="container m-0 p-0">
      <div className="position-relative">
        {/* <img src="assets/p2black.svg" className="position-absolute" />
        <img
          src="assets/p2blue.svg"
          className="position-absolute"
          style="left: 0px; top: 190px;"
        /> */}
      </div>
      <div className="row position-relative ml-4 mt-4 pl-2 pt-3">
        <i className="fa fa-angle-left"></i>
      </div>
      <div className="row mt-0 mb-0 ml-3 pt-5 pb-2">
        <div className="col-6">
          <span className="note">Create Account</span>
        </div>
      </div>
      <div className="row mx-3">
        <div className="col-12 d-flex flex-column">
          <input type="text" placeholder="Name" className="py-3 mb-5" />
          <input type="text" placeholder="Email" className="py-3 mb-5" />
          <input type="text" placeholder="Password" className="py-3" />
        </div>
      </div>
      <div className="row position-relative mx-4 px-2 d-flex justify-content-between align-items-center mt-5 mb-4">
        <span className="big">Sign Up</span>
        <div className="sign-in-btn d-flex justify-content-center align-items-center">
          <i className="fa fa-long-arrow-right"></i>
        </div>
      </div>

      <div className="row position-relative mx-4 px-2 mt-5">
        <span className="underline">Sign In</span>
      </div>
    </div>
  )
}

export default SignUp
