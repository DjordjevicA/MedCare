PGDMP  *                     |           mydb    16.4    16.3 %               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    mydb    DATABASE     �   CREATE DATABASE mydb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United Kingdom.1252';
    DROP DATABASE mydb;
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5                       0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            N           1247    16400    appointment_status    TYPE     e   CREATE TYPE public.appointment_status AS ENUM (
    'Scheduled',
    'Completed',
    'Cancelled'
);
 %   DROP TYPE public.appointment_status;
       public          postgres    false    5            Q           1247    16408    gender_types    TYPE     S   CREATE TYPE public.gender_types AS ENUM (
    'Male',
    'Female',
    'Other'
);
    DROP TYPE public.gender_types;
       public          postgres    false    5            �            1259    16415    alembic_version    TABLE     X   CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);
 #   DROP TABLE public.alembic_version;
       public         heap    postgres    false    5            �            1259    16418    appointments    TABLE       CREATE TABLE public.appointments (
    appointment_id integer NOT NULL,
    doctor_id integer NOT NULL,
    patient_id integer NOT NULL,
    appointment_date timestamp without time zone NOT NULL,
    status public.appointment_status NOT NULL,
    reason_for_visit text
);
     DROP TABLE public.appointments;
       public         heap    postgres    false    5    846            �            1259    16423    appointments_appointment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.appointments_appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.appointments_appointment_id_seq;
       public          postgres    false    216    5                       0    0    appointments_appointment_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.appointments_appointment_id_seq OWNED BY public.appointments.appointment_id;
          public          postgres    false    217            �            1259    16424    doctors    TABLE     ]  CREATE TABLE public.doctors (
    doctor_id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    specialty character varying(100) NOT NULL,
    phone_number character varying(15) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(256) NOT NULL
);
    DROP TABLE public.doctors;
       public         heap    postgres    false    5            �            1259    16429    doctors_doctor_id_seq    SEQUENCE     �   CREATE SEQUENCE public.doctors_doctor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.doctors_doctor_id_seq;
       public          postgres    false    5    218                       0    0    doctors_doctor_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.doctors_doctor_id_seq OWNED BY public.doctors.doctor_id;
          public          postgres    false    219            �            1259    16430    patients    TABLE     z  CREATE TABLE public.patients (
    patient_id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    date_of_birth date NOT NULL,
    phone_number character varying(15) NOT NULL,
    email character varying(100) NOT NULL,
    gender public.gender_types NOT NULL,
    password_hash character varying(256) NOT NULL
);
    DROP TABLE public.patients;
       public         heap    postgres    false    5    849            �            1259    16435    patients_patient_id_seq    SEQUENCE     �   CREATE SEQUENCE public.patients_patient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.patients_patient_id_seq;
       public          postgres    false    5    220                       0    0    patients_patient_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.patients_patient_id_seq OWNED BY public.patients.patient_id;
          public          postgres    false    221            d           2604    16436    appointments appointment_id    DEFAULT     �   ALTER TABLE ONLY public.appointments ALTER COLUMN appointment_id SET DEFAULT nextval('public.appointments_appointment_id_seq'::regclass);
 J   ALTER TABLE public.appointments ALTER COLUMN appointment_id DROP DEFAULT;
       public          postgres    false    217    216            e           2604    16437    doctors doctor_id    DEFAULT     v   ALTER TABLE ONLY public.doctors ALTER COLUMN doctor_id SET DEFAULT nextval('public.doctors_doctor_id_seq'::regclass);
 @   ALTER TABLE public.doctors ALTER COLUMN doctor_id DROP DEFAULT;
       public          postgres    false    219    218            f           2604    16438    patients patient_id    DEFAULT     z   ALTER TABLE ONLY public.patients ALTER COLUMN patient_id SET DEFAULT nextval('public.patients_patient_id_seq'::regclass);
 B   ALTER TABLE public.patients ALTER COLUMN patient_id DROP DEFAULT;
       public          postgres    false    221    220                      0    16415    alembic_version 
   TABLE DATA           6   COPY public.alembic_version (version_num) FROM stdin;
    public          postgres    false    215   !+                 0    16418    appointments 
   TABLE DATA           y   COPY public.appointments (appointment_id, doctor_id, patient_id, appointment_date, status, reason_for_visit) FROM stdin;
    public          postgres    false    216   K+                 0    16424    doctors 
   TABLE DATA           r   COPY public.doctors (doctor_id, first_name, last_name, specialty, phone_number, email, password_hash) FROM stdin;
    public          postgres    false    218   �+       	          0    16430    patients 
   TABLE DATA           �   COPY public.patients (patient_id, first_name, last_name, date_of_birth, phone_number, email, gender, password_hash) FROM stdin;
    public          postgres    false    220   �-                  0    0    appointments_appointment_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.appointments_appointment_id_seq', 6, true);
          public          postgres    false    217                       0    0    doctors_doctor_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.doctors_doctor_id_seq', 6, true);
          public          postgres    false    219                       0    0    patients_patient_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.patients_patient_id_seq', 5, true);
          public          postgres    false    221            h           2606    16440 #   alembic_version alembic_version_pkc 
   CONSTRAINT     j   ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);
 M   ALTER TABLE ONLY public.alembic_version DROP CONSTRAINT alembic_version_pkc;
       public            postgres    false    215            j           2606    16442    appointments appointments_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (appointment_id);
 H   ALTER TABLE ONLY public.appointments DROP CONSTRAINT appointments_pkey;
       public            postgres    false    216            l           2606    16444    doctors doctors_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public.doctors DROP CONSTRAINT doctors_email_key;
       public            postgres    false    218            n           2606    16446    doctors doctors_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (doctor_id);
 >   ALTER TABLE ONLY public.doctors DROP CONSTRAINT doctors_pkey;
       public            postgres    false    218            p           2606    16448    patients patients_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.patients DROP CONSTRAINT patients_email_key;
       public            postgres    false    220            r           2606    16450    patients patients_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (patient_id);
 @   ALTER TABLE ONLY public.patients DROP CONSTRAINT patients_pkey;
       public            postgres    false    220            s           2606    16451 (   appointments appointments_doctor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(doctor_id);
 R   ALTER TABLE ONLY public.appointments DROP CONSTRAINT appointments_doctor_id_fkey;
       public          postgres    false    218    4718    216            t           2606    16456 )   appointments appointments_patient_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id);
 S   ALTER TABLE ONLY public.appointments DROP CONSTRAINT appointments_patient_id_fkey;
       public          postgres    false    216    220    4722                  x�3I2OJIK�072������� /         p   x�3�4�4�4202�54�52V00�#N�ļ�Ԝ��N�����.SNS�ZC]s|j�9���50§����R�� �Z3�,t�ݛ�[��ZT�_�Z�X�������� ��7           x�}�Mo�1���~�^���N��@���CC��m]�vj;|z�-��I���<4]�~=]oV�����j���[�z�����nl�xRw��P�����Ŗ��t�T���Vu!��n�F=F
P����8k"��֞�j�4 �	K-8q�Fb��_�#�h�=�hqH�!e(� {���#�x���o����j{�n�=x��+�ׯO��<�-��o�R�"@�P+���AF����GI�[쾨��I�{��M;�\�$iø�Υ�ZYEC�٧�	�X�{k�l�K��*�d0��l���~�>����� ]�B��x��r���<�+��U+b�d���B�TbSq�IZ�K��
礽@�J���(7	���$%BZ{���u�$�0�5��fqZv����w��"���+P��Kԟ�����������P��<���;7L�f� "N���+��<<��Cؙ U�"Djʠ�K���Z�5=����$e�����l�t��      	   �  x���Ao9F�=�c�U�]e;'+ e��j/e� 3�� Y��Tg������Um�����f��~�co�3��<!�9��)�>{�I��3�����N�~7]�֦/�����4P�|�Oq��^���W�����=>���h�$��,q��Q���Zc�i�J�{� F2���q,���4�X��"�Z�L����f-��1Z��3���i����G ·3���<}�ⳝ~�>B��ݓX�7����Í�>^ݽLk��=6b(b��ZkV!w�yy8_́�"g��}>{
�@C͉9�ֵ���պÇ3E�Ѩ�t���rZ`�:��8���[>�.�@3�.!��ʹ[���=-��{��.�~�痖��1X��SI���8�D�%D`���d0�"$y�H3KM�s�!UbD��t�uH�X��ӌ�%��j"C({I�O��5a����\ӛoC��'�-`�߁�uq�������"�����:�()x�FFl��b�*F�a����I|$ח�Ӛ�NȠ�yV�
"N��W�4�b�,��2��F�wϴ��ʾ�qY���!� 3�_ڐ"�tX�~�w���_^ߔ?�ߝ�����UIP%h�W�D%�[Vν䚇��&�pF�i�b��9��!Uc��%�E�x���oUw&���FX{C�{���j��	�50#     