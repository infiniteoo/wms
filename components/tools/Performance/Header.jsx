import styled from "@emotion/styled";
import Image from "next/image";
import logo from "../public/keyperformance.png";
import UploadCSV from "./UploadCSV";

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 50px;
  background-color: #ffffff;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: auto;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover img {
    transform: scale(1.05);
  }
`;

const Logo = styled(Image)`
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  font-size: 16px;
`;

const Header = ({ setData }) => {
  return (
    <Navbar>
      <LogoContainer>
        <div style={{ width: "120px", height: "auto" }}>
          <Logo src={logo} alt="Logo" priority />
        </div>
      </LogoContainer>
      <UploadCSV setData={setData} />
      <NavLinks>
        <a href="#stats">Stats</a>
        <a href="#profiles">Profiles</a>
        <a href="#inventory">Inventory</a>
      </NavLinks>
    </Navbar>
  );
};

export default Header;
