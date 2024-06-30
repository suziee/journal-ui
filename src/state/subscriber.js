export default function Subscriber(args) {
    const {
        id,
        subscriptions
    } = args;

    this.id = id;
    this.subscriptions = subscriptions;
}