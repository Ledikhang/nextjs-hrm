import { Layout as AntLayout } from "antd";


const { Footer } = AntLayout;

export default function FooterComponent() {
    return (
        <Footer style={{ textAlign: "center" }}>
            ©{new Date().getFullYear()} CNTT VNPT Cà Mau.
            
        </Footer>
    );
}
