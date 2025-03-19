import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import Query from "./services/query/index.jsx";
import Theme from "./theme/theme.jsx";
import Router from "./router/router.jsx";
import i18n from "./services/i18n";
import './assets/index.css'
import OverlayLoader from "./components/OverlayLoader.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Suspense fallback={<OverlayLoader/>}>
        <Query>
            <Theme>
                <Router/>
            </Theme>
        </Query>
    </Suspense>
)
