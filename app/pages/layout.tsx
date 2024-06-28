import SideMenu from "../components/sideMenu";
import { getSession } from "@/src/actions";
import TopMenu from "../components/topMenu";

export default async function PagesLayout({ children }: any) {

  const session = await getSession();

  return (
    <>
      <TopMenu />
      <SideMenu session={session} />
      {children}
    </>
  );
}
