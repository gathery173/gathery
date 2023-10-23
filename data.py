import json


def check_login(login_, password):
    password = str(password)
    with open("data.json", "r", encoding = "utf-8") as r:
        data = json.load(r)


        def check():


            for i in range(len(data["admin"])):
                if login_ == data["admin"][i]["login"]:

                    index = i

                    return ["admin", i]

                else:
                    pass

            for i in range(len(data["classes"])):
                if login_ == data["classes"][i]["login"]:
                    index = i
                    return ["teacher", i]
                else:
                    pass

        if check()[0] == "admin":
            index = check()[1]
            if password == data["admin"][index]["pass"]:
                result = "admin-login-true"
            else:
                result = "admin-login-false"

        elif check()[0] == "teacher":
            index = check()[1]

            if password == data["classes"][index]["pass"]:
                result = "teacher-login-true"
            else:
                result = "teacher-login-false"


        else:
            result = "unregistered"

        return result

def write_user(data):
    with open("data.json", "w") as file:

        json.dump(data, file, indent = 4)
def set_user_password(user, password):
    password = str(password)
    with open("data.json", "r") as file :
        data = json.load(file)
        for i in range(len(data['classes'])):
            if data['classes'][i]["login"] == user:
                data['classes'][i]["pass"] = password
    write_user(data)

def get_classes():
    with open("data.json", "r") as file :
        data = json.load(file)
        a = []
        for i in range(len(data['classes'])):
            a.append(data['classes'][i])

        return a

def edit_class(old_teacher, new_teacher, new_index, new_leader, new_room, new_login, new_password):
    with open("data.json", "r") as file :
        data = json.load(file)
        a = []

        for i in range(len(data['classes'])):
            if data["classes"][i]["teacher"] == old_teacher:
                data["classes"][i]["teacher"] = new_teacher
                data["classes"][i]["index"] = new_index
                data["classes"][i]["leader"] = new_leader
                data["classes"][i]["room"] = new_room
                data["classes"][i]["login"] = new_login
                data["classes"][i]["pass"] = new_password

        write_user(data)

def get_class_data(teacher):
    login = f"{teacher}@school173.com.ua"
    for i in get_classes():
        if i["login"] == login:
            return i


def delete_class(teacher):
    with open("data.json", "r") as file :
        data = json.load(file)
        a = []

        for i in range(len(data['classes'])):
            if data["classes"][i]["teacher"] == teacher:
                pass
            else:
                a.append(data["classes"][i])
        data["classes"] = a

        write_user(data)

def add_class(teacher, index, leader, room, login):
    with open("data.json", "r") as file :
        data = json.load(file)

        a = {
            "teacher": teacher,
            "login": login,
            "pin": "school173",
            "pass": "",
            "index": index,
            "leader": leader,
            "room": room
        }

        data["classes"].append(a)

        write_user(data)