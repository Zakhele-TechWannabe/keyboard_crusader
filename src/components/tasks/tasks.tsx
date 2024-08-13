import React from "react";
import { Modal, Button, Select, Input } from "antd";
import "@/styles/tasks.css";

interface TasksProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const Tasks: React.FC<TasksProps> = ({ visible, onOk, onCancel }) => {
  return (
    <Modal
      title="Add New Item"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      centered
      className="vs-modal"
    >
      <div className="vs-modal-content">
        <div className="vs-modal-section">
          <label className="vs-label">Name:</label>
          <Input className="vs-input" placeholder="Enter file name" />
        </div>

        <div className="vs-modal-section">
          <label className="vs-label">Template:</label>
          <Select className="vs-select" defaultValue="C# Class">
            <Select.Option value="C# Class">C# Class</Select.Option>
            <Select.Option value="Interface">Interface</Select.Option>
            <Select.Option value="Enum">Enum</Select.Option>
            <Select.Option value="Empty File">Empty File</Select.Option>
          </Select>
        </div>
      </div>

      <div className="vs-modal-footer">
        <Button onClick={onCancel} className="vs-cancel-button">
          Cancel
        </Button>
        <Button type="primary" onClick={onOk} className="vs-ok-button">
          Add
        </Button>
      </div>
    </Modal>
  );
};

export default Tasks;