from flet import *

from flet_route import Routing, path

from index import IndexPage

def main(page: Page):

    page.theme_mode = ThemeMode.SYSTEM
    routes = [path("/", view=IndexPage().view, clear=True)
    ]
    Routing(page = page, app_routes = routes)
    page.go(page.route)

app(main, view = WEB_BROWSER)