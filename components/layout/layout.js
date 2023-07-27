import MainNav from "./MainNav";


function Layout(props) {
  return (
    <>
      <MainNav/>
      <main id="body-main">{props.children}</main>
    </>
  );
}

export default Layout;