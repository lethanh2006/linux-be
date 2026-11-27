import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLearnerProgress1795766039112 implements MigrationInterface {
    name = 'CreateLearnerProgress1795766039112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "learner" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "code" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_5433e0add5db6327475ee378869" UNIQUE ("code"), CONSTRAINT "PK_c6521028f8bb5e7ab25067f8f4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lesson_progress" ("learner_id" uuid NOT NULL, "lesson_slug" text NOT NULL, "completed_at" TIMESTAMP WITH TIME ZONE, "quiz_score" smallint, "quiz_total" smallint, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "lesson_progress_quiz_check" CHECK (quiz_score IS NULL OR (quiz_total > 0 AND quiz_score BETWEEN 0 AND quiz_total)), CONSTRAINT "PK_795aafdc284bcbcb812c3276ffd" PRIMARY KEY ("learner_id", "lesson_slug"))`);
        await queryRunner.query(`ALTER TABLE "lesson_progress" ADD CONSTRAINT "FK_fc5077a0cb369658039b324ea53" FOREIGN KEY ("learner_id") REFERENCES "learner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lesson_progress" DROP CONSTRAINT "FK_fc5077a0cb369658039b324ea53"`);
        await queryRunner.query(`DROP TABLE "lesson_progress"`);
        await queryRunner.query(`DROP TABLE "learner"`);
    }

}
