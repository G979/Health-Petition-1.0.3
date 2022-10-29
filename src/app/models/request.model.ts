export class Request {
  constructor(
    public id: string,
    public campaign: string,
    public createdBy: string,
    public description: string,
    public dismiss: boolean,
    public isFinalised: boolean,
    public recipient: string,
    public downloadUrl: string
  ) {}
}
