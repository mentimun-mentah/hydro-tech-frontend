import Style from 'components/Auth/style'

const AuthSidebar = ({children}) => {
  return (
    <>
      <div id="main-container">
        <section className="auth-sidebar">
          <div className="auth-sidebar-content">
            <header>
              <h1 className="bold">
                HYDRO X TECH
              </h1>
              <h1 className="h1 bolder">Grow, learn, share and repeat!</h1>
            </header>
            <div className="artwork">
              <div className="artwork-image" />
              <h1 className="artwork-attribution bold">
                by mentimun-mentah
              </h1>
            </div>
          </div>
        </section>
        {children}
      </div>

      <style jsx>{Style}</style>
    </>
  )
}

export default AuthSidebar
