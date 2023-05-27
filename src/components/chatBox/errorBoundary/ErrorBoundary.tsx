import React from "react";
import styles from "./errorBoundary.module.scss";
import img from "../../../assets/images/chatBox-bg.jpeg";
interface MyProps {
  children: React.ReactNode;
}

interface MyState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.text}>Что-то пошло нет так</div>
          <img height={100} className={styles.img} src={img} alt="icon" />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
