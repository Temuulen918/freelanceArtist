import { getSession, changePassword } from "@/src/actions"
import { redirect } from "next/navigation";
import { findAccount, getSingleValue } from "@/myXata";
import { EditButton, EditButton2, EditButton3 } from "@/app/components/editButton";


const Home = async () => {

  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/")
  }

  const id = await findAccount(session.username) as string;
  const turul = session.type;

  const record = await getSingleValue(id, turul)
  console.log(record)

  const UserPass = () => {
    return (
      <form action={changePassword} className="flex flex-col">
        <h1>Хаягийн мэдээлэл</h1>
        <label>Нэвтрэх нэр</label>
        <input defaultValue={session.username} readOnly className="input input-bordered w-full mytextarea" name="username"></input>
        <label>Шинэ нууц үг</label>
        <input type="password" name="password" className="input input-bordered w-full mytextarea"></input>
        <button className="btn text-white blue-button w-32">Хадгалах</button>
      </form>
    )
  }


  if (session.type === 'buteelch') {
    return (
      <div className="myform">
        <UserPass />
        <EditButton artist={record} />
      </div>
    )
  } else {
    if (session.type === 'holboo') {
      return (
        <div className="myform">
          <UserPass />
          <EditButton2 holboo={record} />
        </div>
      )
    } else {
      if (session.type === 'ajiltan') {
        return (
          <div className="myform">
            <UserPass />
            <EditButton3 ajiltan={record} />
          </div>
        )
      } else {
        return (
          <div className="myform">
            <UserPass />
          </div>
        )
      }
    }
  }
}
export default Home