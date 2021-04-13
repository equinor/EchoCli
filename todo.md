# Echo CLI v0.0.1

echo-build, echo-run and echo-create are actions in EchoCli.

# Echo App Template

-   [ ] App should be able to register what it needs,
-   [ ] Register api Made available trough setup function.
-   [ ] Registering Apps / Routes
-   [ ] Register App Settings
-   [ ] Register links connected to a tag.
-   [ ] Register External Link
-   [ ] Register Tag Application

Under we have purposed setup function defined with Piral and Pilet in mind

```javascript
export default function setup(api: EchoApi) {
    api.registerApp('/myapp', {
        Component,
        Icon,
        homeLink: true,
        mainMenu: false
    });
    api.registerAppSettings('myapp', {
        Component,
        Icon,
        homeLink: true,
        main,
        menu: false
    });

    api.registerTagLink('myapp', Component, { visible: () => Boolean });
    api.registerTagApp('mytagapp', Component, {});
    api.registerPanels();

    api.registerExternalLink();
}
```

```javascript

import pdfViewerSetup from "pdfv"
import mediaSetup from "mediaSetup"
import tagHubSetup from "tagHubSetup"

function getApps(){
    return [
        {
            name: "pdf"
            setup: pdfViewerSetup
            // so and so...
        },
           {
            name: "media"
            setup: mediaSetup
            // so and so...
        },
        {
             name: "media"
            setup: tagHubSetup
            //
        }
    ]

}



function echoSetup() {
    const apps = getApps();

    // verify app here
    apps.map((app)=>{
        app.setup(echoApi);
    })
}


const EchoRouter = () => {
    const routes = useRouteApplications()

    return (<Router>

        {
        routes.map(route=>{
               const Layout = getLayout(route.layout);
               return (<Layout>
               <Route exact path={route.key} component={route.component}/>
               </Layout>);
        });
      }
      <Router>
    )

}

```
