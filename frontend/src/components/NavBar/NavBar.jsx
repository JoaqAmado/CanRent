import "./NavBar.css";

function NavBar() {
    return (
        <body>
            <div class="header">
                {/* logo and welcome message at the top of the landing page. */}
                <img style="width: 30px;" src="assets/CanRent Logo.png"></img>
                <span class="welcome-message">Welcome to CanRent</span>

                {/* this section contains buttons linked to the other pages. */}
                <div class="tabs">
                    <button class="tabs-button">
                        <div class="tabs-label">Stuff</div>
                    </button>
                    <button class="tabs-button">
                        <div class="tabs-label">Browse</div>
                    </button>
                    <button class="tabs-button">
                        <div class="tabs-label">Saved</div>
                    </button>
                </div>
            </div>
        </body>
    );
}
export default NavBar;