/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
    interface Locals {
      email: string;
      name : string
      welcomeTitle : () => void
    }
  }

