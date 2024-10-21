import { AppProps } from "next/app"; // Import từ next/app, không phải từ antd
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

// Định nghĩa kiểu LayoutProps
export interface LayoutProps {
  children: ReactNode;
}

// Mở rộng kiểu NextPage để thêm Layout
export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement;
};

// Mở rộng kiểu AppProps để thêm Layout
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
