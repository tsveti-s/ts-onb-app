export interface AppBarProps {
  history: {
    push: (url: string) => void;
  };
  location: {
    pathname: string | undefined;
  };
  match: any;
  staticContent: any;
}
