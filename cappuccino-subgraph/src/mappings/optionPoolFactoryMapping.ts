import { log, ethereum } from "@graphprotocol/graph-ts";
import { OptionPool } from "../../generated/schema";
import {LogOptionPoolCreation} from "../../generated/OptionPoolFactory/OptionPoolFactory";


export function handleOptionPoolCreated(event: LogOptionPoolCreation): void {
  let entity = OptionPool.load(event.params.hash.toString());
  if (entity != null) {
    log.debug("Duplicate LP eject {}", [event.params.hash.toString()]);
    return;
  } else {
    entity = new OptionPool(event.params.hash.toString());
  }

  entity.pool = event.params.pool.toHexString();
  entity.base = event.params.base.toHexString();
  entity.short = event.params.short.toHexString();
  entity.optionType = event.params.optionType;
  entity.liquidity = event.params.liquidity;
  entity.bcv = event.params.bcv;
  entity.strike = event.params.strike;
  entity.maturity = event.params.maturity;

  entity.save();
}
