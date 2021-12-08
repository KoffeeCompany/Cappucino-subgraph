import { log } from "@graphprotocol/graph-ts";
import { Option } from "../../generated/schema";
import {LogOptionCreation} from "../../generated/OptionPool/OptionPool";

export function handleCreateOption(event: LogOptionCreation): void {
  let entity = Option.load(event.params.id.toString());
  if (entity != null) {
    log.debug("Duplicate Option {}", [event.params.id.toString()]);
    return;
  } else {
    entity = new Option(event.params.id.toString());
  }

  entity.status = "submitted";
  entity.pool = event.params.pool.toHexString();
  entity.user = event.params.user.toHexString();
  entity.amountOut = event.params.amountOut;
  entity.amountIn = event.params.amountIn;

  entity.save();
}