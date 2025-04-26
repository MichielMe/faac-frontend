// src/declarations.d.ts
declare module "*.tsx" {
  import React from "react";
  const content: React.ComponentType<any>;
  export default content;
}

declare module "*.ts" {
  const content: any;
  export default content;
}
