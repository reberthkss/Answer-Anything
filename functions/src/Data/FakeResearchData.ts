export const generateFakeData = (authId: any) => (Array.from({length: 20}, (_, i) => ({
    id: `${i}`,
    description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        roles: {
        [authId ? authId.toString() : "0"] : "owner"
        },
    questions:
        Array.from({length: 10}, (_, i) => ({
            id: `${i}`,
            options: options,
            question: "quantos anos vc tem?",
            selectedOption: null
        }))
    ,
    status: "CLOSED",
    subtitle: "init",
    title: "simple research",
}
)));

const options = new Map<number, string>();

for (let i = 0 ; i < 4 ; i++) {
    options.set(i, `a${i}`);
}
