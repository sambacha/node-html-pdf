declare module "html-pdf" {
  import * as fs from "fs";

  export interface CreateOptions {
    // Export options
    directory?: string;

    // Papersize Options: http://phantomjs.org/api/webpage/property/paper-size.html
    height?: string;
    width?: string;
    format?: "A3" | "A4" | "A5" | "Legal" | "Letter" | "Tabloid";
    orientation?: "portrait" | "landscape";

    // Page options
    border?:
      | string
      | {
          top?: string;
          right?: string;
          bottom?: string;
          left?: string;
        };

    header?: {
      height?: string;
      contents?: string;
    };
    footer?: {
      height?: string;
      contents?: {
        first?: string;
        [page: number]: string;
        default?: string;
        last?: string;
      };
    };

    // Rendering options
    base?: string;

    // Zooming option, can be used to scale images if `options.type` is not pdf
    zoomFactor?: string;

    // File options
    type?: "png" | "jpeg" | "pdf";
    quality?: string;

    // Script options
    phantomPath?: string;
    phantomArgs?: string[];
    script?: string;
    timeout?: number;

    // HTTP Headers that are used for requests
    httpHeaders?: {
      [header: string]: string;
    };

    settings?: {
      // javascriptEnabled defines whether to execute the script in the page or not (defaults to true).
      javascriptEnabled?: boolean;
      // loadImages defines whether to load the inlined images or not (defaults to true).
      loadImages?: boolean;
      // localToRemoteUrlAccessEnabled defines whether local resource (e.g. from file) can access remote URLs or not (defaults to false).
      localToRemoteUrlAccessEnabled?: boolean;
      // userAgent defines the user agent sent to server when the web page requests resources.
      userAgent?: string;
      // userName sets the user name used for HTTP authentication.
      userName?: string;
      // password sets the password used for HTTP authentication.
      password?: string;
      // XSSAuditingEnabled defines whether load requests should be monitored for cross-site scripting attempts (defaults to false).
      XSSAuditingEnabled?: boolean;
      // webSecurityEnabled defines whether web security should be enabled or not (defaults to true).
      webSecurityEnabled?: boolean;
      // resourceTimeout (in milli-secs) defines the timeout after which any resource requested will stop trying and proceed with other parts of the page.
      // onResourceTimeout callback will be called on timeout.
      resourceTimeout?: number;
    };
  }

  export interface FileInfo {
    filename: string;
  }

  export interface CreateResult {
    toBuffer(callback: (err: Error, buffer: Buffer) => void): void;
    toFile(callback: (err: Error, res: FileInfo) => void): void;
    toFile(
      filename?: string,
      callback?: (err: Error, res: FileInfo) => void
    ): void;
    toStream(
      callback: (
        err: Error,
        stream: fs.ReadStream,
        dimensions: { height: number; width: number }
      ) => void
    ): void;
  }

  export function create(html: string, options?: CreateOptions): CreateResult;
}
