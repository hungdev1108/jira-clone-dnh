import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";

export default function FormEditProject(props) {
  const [state, setState] = useState();
  const dispatch = useDispatch();

  const submitFrom = (e) => {
    e.preventDefault();
    alert("Complete");
  };

  useEffect(() => {
    dispatch({
      type: "SET_SUBMIT_EDIT_PROJECT",
      submitFunction: submitFrom,
    });
  });

  const handleEditorChange = (content, editor) => {
    // setFieldValue("description", content);
    console.log(props);
  };
  return (
    <form className="container" onSubmit={submitFrom}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">ID</p>
            <input className="form-control" type="text" name="id" disabled />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Name</p>
            <input className="form-control" type="text" name="projectName" />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <input className="form-control" type="text" name="categoryId" />
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              className="form-control"
              name="description"
              onEditorChange={handleEditorChange}
              init={{
                selector: "textarea#myTextArea",
                height: 500,
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
      </div>
    </form>
  );
}
