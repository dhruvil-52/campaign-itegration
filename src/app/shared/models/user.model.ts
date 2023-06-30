export class UserModel {
  constructor(
    public Id: number = null as any,
    public IsDeleted: boolean = null as any,
    public IsAgent: boolean = false,
    public IsTeamLead: boolean = false,
    public CompanyCallSubscription: boolean = null as any,
    public Designation: string = null as any,
    public Username: string = null as any,
    public Email: string = null as any,
    public Name: string = null as any,
    public Mobile: string = null as any,
    public LastLogin: string = null as any,
    public ProjectId: string = null as any,
    public ProjectName: string = null as any,
    public RoleName: string = null as any,
    public RoleId: number = null as any,
    public CompanyName: string = null as any,
    public CompanyWeb: string = null as any,
    public Url: string = null as any,
    public Permissions: Array<any> = [],
    public Roles: Array<any> = [],
    public Role: any = null,
    public HasProDataSubscription: boolean = false,
    public HasMaskContact: boolean = false,
    public ApiKey: string = '',
    public CompanyId: number = null as any

  ) { }
}