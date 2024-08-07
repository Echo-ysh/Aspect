import {
    allocate,
    entryPoint,
    execute,
    IPreContractCallJP,
    PreContractCallInput,
    sys,
    uint8ArrayToHex,
    UintData,
} from "@artela/aspect-libs";
import {Protobuf} from "as-proto/assembly";

/**

 */
class Aspect implements IPreContractCallJP {
    /**
     *
     * @param input
     */
    preContractCall(input: PreContractCallInput): void {
        // read the throttle config from the properties and decode
const { contractAddress, fromAddress } = input;
        // get the contract address, from address and build the storage prefix
const currentBlockTimestamp = sys.getBlockTimestamp();
        // load the current block timestamp
const throttleKey = this.buildThrottleKey(contractAddress, fromAddress);
        // load last execution timestamp
 let { lastTimestamp, callCount } = this.loadThrottleState(throttleKey);
        // check if the throttle interval has passed, revert if not
if ((currentBlockTimestamp - lastTimestamp <= this.throttleInterval) && callCount >= this.throttleLimit) {
            sys.revert("Throttle limit reached");
        }
        // check if the throttle limit has been reached, revert if so
this.updateThrottleState(throttleKey, currentBlockTimestamp, callCount + 1);
    }
        // update the throttle state
    }

    /**
     * isOwner is the governance account implemented by the Aspect, when any of the governance operation
     * (including upgrade, config, destroy) is made, isOwner method will be invoked to check
     * against the initiator's account to make sure it has the permission.
     *
     * @param sender address of the transaction
     * @return true if check success, false if check fail
     */
    isOwner(sender: Uint8Array): bool {
        return false;
    }
 private buildThrottleKey(contractAddress: string, fromAddress: string): string {
        return `${contractAddress}-${fromAddress}`;
    }
private loadThrottleState(throttleKey: string): { lastTimestamp: u64, callCount: u64 } {
    return { lastTimestamp: 0, callCount: 0 };
    }
private updateThrottleState(throttleKey: string, lastTimestamp: u64, callCount: u64): void {
    private throttleInterval: u64 = 5;
private throttleLimit: u64 = 2;
// 2.register aspect Instance
const aspect = new Aspect()
entryPoint.setAspect(aspect)

// 3.must export it
export { execute, allocate }

