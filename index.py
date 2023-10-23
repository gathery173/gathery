from flet import *
from flet_route import Params, Basket

class IndexPage:
    def __init__(self):
        super().__init__()
    def view(self, page: Page, params: Params, basket: Basket):

        page.title = "Gathery"

        body = Column()

        title_text = Row(controls=[Text("Вхід", size=30, weight=FontWeight.W_900)],
                         alignment=MainAxisAlignment.CENTER)

        text_under = Row(controls=[
            Text("до системи організації шкільних заходів", text_align=TextAlign.CENTER, color=colors.GREY)],
            alignment=MainAxisAlignment.CENTER)

        but = FilledTonalButton("Увійти в систему", width=300)

        con = Container(height=80)

        login = TextField(label="Ім'я користувача", border=InputBorder.UNDERLINE)
        password = TextField(label="Пароль", border=InputBorder.UNDERLINE, password=True,
                             can_reveal_password=True)

        body_ = Row([Card(content=Container(Column([
            login,
            password,
            Container(height=20),
            but

        ]), padding=40), elevation=20)], alignment=MainAxisAlignment.CENTER)

        body.controls.append(con)

        body.controls.append(title_text)
        body.controls.append(text_under)
        body.controls.append(body_)
        appbar = AppBar(title = Text("Gathery"))

        return View("/", controls = [appbar, body])