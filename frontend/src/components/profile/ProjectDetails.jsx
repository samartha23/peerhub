import React, { useState } from "react";
import Input from "../utils/ui/Input";
import Button from "../utils/ui/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAddProjectMutation } from "../../hooks/projects/useAddProjectMutation";
const ProjectDetails = () => {
  const [projectData, setProjectData] = useState({
    title: "",
    tagline: "",
    description: "",
    projectLink: "",
    opensource: false,
  });
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"], // toggled buttons
      ["link"], // link
      [{ list: "ordered" }, { list: "bullet" }], // lists
    ],
  };
  //   const addProject =
  const handleEditorChange = (content) => {
    setProjectData({ ...projectData, description: content }); // Update the state with the new content
  };
  const addProjectMutation = useAddProjectMutation();
  const handleProject = () => {
    addProjectMutation.mutate(projectData);
  };
  return (
    <div className="mt-14 border-r h-full pb-14">
      <div className="py-8 px-8 flex flex-col gap-6">
        <div className="flex gap-2">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Project name
            </p>
          </div>
          <div className="w-full">
            <Input
              value={projectData.title}
              onChange={(e) =>
                setProjectData({ ...projectData, title: e.target.value })
              }
              placeholder="Peerlist"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">Tagline</p>
          </div>
          <div className="w-full">
            <Input
              value={projectData.tagline}
              onChange={(e) =>
                setProjectData({ ...projectData, tagline: e.target.value })
              }
              placeholder="A Professional network for people in tech"
            />
            <p className="text-[#6a737d] font-normal text-[10px] pt-0.5">
              Describe your project in 60 characters or less.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Project URL
            </p>
          </div>
          <div className="w-full">
            <Input
              value={projectData.projectLink}
              onChange={(e) =>
                setProjectData({ ...projectData, projectLink: e.target.value })
              }
              placeholder="projectdemo.com/"
            />
            <p className="text-[#6a737d] font-normal text-[10px] pt-0.5">
              Provide a demo link where users can interact with your project or
              a download link. If unavailable, include codebase links.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Is this project open source?
            </p>
          </div>
          <div className="w-full flex items-center">
            <input
              value={projectData.opensource}
              onChange={(e) =>
                setProjectData({ ...projectData, opensource: e.target.checked })
              }
              type="checkbox"
              name=""
              id=""
            />
            <span className="text-xs select-none cursor-pointer font-normal text-primary placeholder-gray-gray4 pl-2">
              Yes
            </span>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <p className=" text-primary font-medium text-sm flex-1">
              Describe the Project
            </p>
            <p className="text-xs mt-1 mb-3">
              Highly recommended! This helps a lot for SEO and find your project
              on Google.
            </p>
          </div>
          <ReactQuill
            value={projectData.description}
            onChange={handleEditorChange}
            theme="snow"
            className="h-[300px] "
            modules={modules}
          />
        </div>
      </div>
      <div className="fixed max-w-[640px] w-full sm:bottom-0 bottom-16 flex items-center justify-end px-6 py-4 bg-[#f6f8fa] border-t border-r">
        <Button
          title="Save"
          loading={addProjectMutation.isPending}
          onClick={handleProject}
          className="bg-[#00aa45] text-xs text-white border-2 border-[#219653] rounded-full px-3 py-0.5 hover:bg-[#219653]"
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
