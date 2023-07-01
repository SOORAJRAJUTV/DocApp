import  React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { Card, Input } from "antd";

const Notes = () => {
  const onChange = (e) => {
    console.log(e);
  };
  const navigate = useNavigate()

  const handleClick = () =>{
      alert("Succesfully submitted");
      navigate("/doctor-appointments");
      
  }

  return (
    <Layout>
      <div>
        <Card title="My Notes">
          <Card type="inner" title="Symptoms" extra={<a href="#">More</a>}>
          
              <div>
                <Input placeholder="Symptoms" allowClear onChange={onChange} />
                <br /> <br />
                <Input placeholder="" allowClear onChange={onChange}/>
              </div>
    
          </Card>
          <Card style={{ marginTop: 16, }}
            type="inner" title="Prescription"
            extra={<a href="#">More</a>}
          >

           <div>
                <Input placeholder="Prescription" allowClear onChange={onChange}/>
                <br /> <br />
                <Input  placeholder=""  allowClear  onChange={onChange}/>
              </div>
          
          </Card>


          <button className="btn btn-success" onClick={handleClick}>Submit</button>
          
        </Card>
      </div>
    </Layout>
  );
};

export default Notes;
