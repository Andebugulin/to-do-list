const TaskFrame = ({ children }) => (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#000A0A',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25) inset',
      border: '3px #F78166 solid',
    }}>
      {children}
    </div>
  );
  
  export default TaskFrame;