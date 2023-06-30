import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { Card, Input } from "antd";

const Notes = () => {
  const onChange = (e) => {
    console.log(e);
  };

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


          <button className="btn btn-success ">Edit</button>
          <button className="btn btn-danger ms-2">Delete</button>
        </Card>
      </div>
    </Layout>
  );
};

export default Notes;
