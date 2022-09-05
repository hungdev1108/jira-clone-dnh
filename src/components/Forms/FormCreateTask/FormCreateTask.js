import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";
import React from "react";
import { useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";

export default function FormCreateTask(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
    // console.log(props);
  };

  const { Option } = Select;
  const children = [];
  const handleChangee = (value) => {
    console.log(`Selected: ${value}`);
  };
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }

  return (
    <div className="container">
      <div className="form-group">
        <p className="font-weight-bold">Project</p>
        <select name="projectId" className="form-control">
          <option value="50">Project A</option>
          <option value="60">Project B</option>
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p className="font-weight-bold">Priority</p>
            <select className="form-control" name="priorityId">
              <option value="">High</option>
              <option value="">Medium</option>
              <option value="">Low</option>
            </select>
          </div>
          <div className="col-6">
            <p className="font-weight-bold">Task type</p>
            <select type="text" className="form-control" name="typeId">
              <option value="">New Task</option>
              <option value="">Bugs</option>
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p className="font-weight-bold">Assignees</p>
            <Select
              mode="multiple"
              size="large"
              name="listUserAsign"
              placeholder="Please select"
              defaultValue={["a10", "c12"]}
              onChange={handleChangee}
              style={{
                width: "100%",
              }}
            >
              {children}
            </Select>
          </div>
          <div className="col-6">
            <p className="font-weight-bold">Original Estimate</p>
            <input className="form-control" type="number" name="originalEstimate" min={0} defaultValue={0} />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-12">
            <div>
              <p className="font-weight-bold d-flex align-items-center">
                Time tracking
                <span className="d-block">
                  <ClockCircleOutlined className="d-block ml-1" />
                </span>
              </p>
            </div>
            <Slider
              value={timeTracking.timeTrackingSpent}
              defaultValue={30}
              max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
              tooltip={{ open: true }}
            />
            <div className="row">
              <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</div>
              <div className="col-6 text-right font-weight-bold">
                {timeTracking.timeTrackingRemaining}h remaining
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <p>Time spent(hours)</p>
                <input
                  min={0}
                  defaultValue={0}
                  className="form-control"
                  type="number"
                  name="timeTrackingSpent"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="col-6">
                <p>Time remaining(hours)</p>
                <input
                  min={0}
                  defaultValue={0}
                  className="form-control"
                  type="number"
                  name="timeTrackingRemaining"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p className="font-weight-bold">Description</p>
        <Editor
          className="form-control"
          name="description"
          onEditorChange={handleEditorChange}
          init={{
            selector: "textarea#myTextArea",
            height: 400,
            menubar: false,
            statusbar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
    </div>
  );
}
