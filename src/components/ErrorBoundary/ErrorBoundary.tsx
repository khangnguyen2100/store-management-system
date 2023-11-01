import { Button } from 'antd';
import { Component, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen w-full'>
          <div className='flex-center mt-24 h-full flex-col text-center'>
            <h1>Đã có lỗi xảy ra</h1>
            <Button
              type='primary'
              className='mt-5'
              onClick={() => window.location.reload()}
            >
              Tải lại trang
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
