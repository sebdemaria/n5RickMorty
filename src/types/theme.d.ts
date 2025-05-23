import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        fonts: {
            main: string;
        };
        colors: {
            text: string;
        };
    }
}
