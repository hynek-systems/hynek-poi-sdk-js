# Hynek POI SDK

Official JavaScript SDK for Hynek POI.

## Install

npm install @hynek/poi-sdk-js

## Usage

```ts
import { HynekPOIClient } from "@hyneksystems/poi-sdk-js";

const client = new HynekPOIClient();

const pois = await client.pois.nearby({
  latitude: 56.833,
  longitude: 13.933,
});
```
